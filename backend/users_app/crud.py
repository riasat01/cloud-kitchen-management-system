from sqlalchemy.orm import Session

from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from decouple import config

from jose import JWTError, jwt
from passlib.context import CryptContext
from bcrypt import gensalt

from . import models, schemas
from .schemas import TokenData

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('TOKEN_ALGORITHM')
ACCESS_TOKEN_EXPIRES_MINUTES = 10080
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/token/")
pwd_context = CryptContext(schemes=[config('HASH_ALGORITHM')], deprecated="auto")


def varify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt



def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_pass(db: Session, sk: str):
    # return db.query(models.Password).filter(pwd_context.verify(sk, models.Password.hashed_key)).first()
    hashed_keys = db.query(models.Password).all()
    for hk in hashed_keys:
        if pwd_context.verify(sk, hk.hashed_key):
            return hk

def create_user(db: Session, user: schemas.UserCreate):
    st = str(gensalt())
    sk = str(user.email) + str(datetime.timestamp(datetime.now()))
    hashed_password = get_password_hash(user.password)
    hk=get_password_hash(st + sk)
    db_user = models.User(
        full_name=user.full_name,
        email=user.email,
        phone="+880" + user.phone,
        division= user.division,
        district=user.district,
        address=user.address,
        photo_url=user.photo_url,
        salt=st,
        special_key=sk
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db_pass = models.Password(
        hashed_key = hk,
        hashed_password = hashed_password
    )
    db.add(db_pass)
    db.commit()
    db.refresh(db_pass)
    return db_user

def authenticate_user(email: str, password: str, db: Session):
    user = get_user_by_email(db=db, email=email)
    print(user.email)
    if not user:
         return False
    pw = get_pass(db=db, sk=user.salt + user.special_key)
    if not pwd_context.verify(password, pw.hashed_password):
        return False
    return user

async def get_current_user(token: str, db: Session):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        paylod = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email: str = paylod.get("sub")
        if user_email is None:
            raise credentials_exception
        token_data = TokenData(user_email=user_email)
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db=db, email=token_data.user_email)
    if user is None:
        raise credentials_exception
    return user

async def set_active(token: str, db: Session):
    user = await get_current_user(token=token, db=db)
    print(user.email)
    print(user.is_active)
    if user:
        user.is_active = True
        db.commit()
        print(user.is_active)
        return user
    return False


async def get_all_district(db: Session, skip: int = 0, limit: int = 64):
    return db.query(models.District).offset(skip).limit(limit).all()

async def get_district_by_name(db: Session, name: str):
    return db.query(models.District).filter(models.District.name == name).first()


async def get_all_food(db: Session, skip: int = 0, limit: int = 1000):
    return db.query(models.Food).offset(skip).limit(limit).all()

async def get_food_by_restaurant(db: Session, restaurant_id: int):
    return db.query(models.Food).filter(models.Food.restaurant_id == restaurant_id)

async def create_food(db: Session, food: schemas.FoodCreate):
    db_food = models.Food(
        food_name = food.food_name,
        food_image = food.food_image,
        price = food.price,
        ratings = food.ratings,
        number_of_raters = food.number_of_raters,
        restaurant_id = food.restaurant_id
    )
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food

async def get_all_restaurant(db: Session, skip: int = 0, limit: int = 1000):
    return db.query(models.Restaurant).offset(skip).limit(limit).all()

async def get_restaurant_by_district(db: Session, district_id: int):
    return db.query(models.Restaurant).filter(models.Restaurant.district_id == district_id)

async def get_restaurant_by_id(db: Session, restaurant_id: int):
    return db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()

async def create_restaurant(db: Session, restaurant: schemas.RestaurantCreate):
    db_district = await get_district_by_name(db, restaurant.district_id)
    db_restaurant = models.Restaurant(
        restaurant_name = restaurant.restaurant_name,
        restaurant_address = restaurant.restaurant_address,
        cover_photo = restaurant.cover_photo,
        ratings = restaurant.ratings,
        number_of_raters = restaurant.number_of_raters,
        district_id = db_district.id
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant