from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta

from .database import SessionLocal, engine
from .crud import authenticate_user, ACCESS_TOKEN_EXPIRES_MINUTES, create_access_token, oauth2_scheme, get_current_user, set_active, get_all_district, get_all_food, get_all_restaurant, get_restaurant_by_district, get_user_by_email, create_user, get_food_by_restaurant, get_restaurant_by_id
from .schemas import Token, OTP, User, UserCreate, District, Food, Restaurant
from .otp import send_otp, verify_otp
from .models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3001",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hi there"}


###########################################################################################################
########################################## USERS API ENDPOINTS ############################################
###########################################################################################################

@app.post("/api/v1/users/", response_model=User)
def post_user(user: UserCreate, db: Annotated[Session, Depends(get_db)]):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


@app.get("/api/v1/users/me/", response_model=User)
async def read_users_me(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)]):
    user = await get_current_user(token = token, db = db)
    return user



###########################################################################################################
########################################## USERS API ENDPOINTS ############################################
###########################################################################################################


###########################################################################################################
####################################### LOGIN/TOKEN API ENDPOINTS #########################################
###########################################################################################################
@app.post("/api/v1/token/")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Annotated[Session, Depends(get_db)]):
    user = authenticate_user(form_data.username, form_data.password, db)
    print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
            )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token = access_token, token_type = "bearer")

@app.get("/api/v1/token/verify/")
async def verify_token(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)]):
    user = await get_current_user(token, db)
    if user.email is None:
        return False
    return True
###########################################################################################################
####################################### LOGIN/TOKEN API ENDPOINTS #########################################
###########################################################################################################

###########################################################################################################
########################################### OTP API ENDPOINTS #############################################
###########################################################################################################


@app.get("/api/v1/otp/")
async def getotp(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)]):
    await send_otp(token, db)
    return {"message": "OTP send successfully"}

@app.post("/api/v1/otp/verify/", response_model=None)
async def postotp(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)], otp: OTP):
    is_valid = verify_otp(otp_str=otp.otp)
    print(is_valid)
    if is_valid:
       return await set_active(token=token, db=db)
    return False
    # if is_valid:
    #     set_active(token=token, db=db)
    #     return True
    # return False


###########################################################################################################
########################################### OTP API ENDPOINTS #############################################
###########################################################################################################

###########################################################################################################
######################################## DISTRICT API ENDPOINTS ###########################################
###########################################################################################################

@app.get("/api/v1/district/", response_model=list[District])
async def get_district(db: Annotated[Session, Depends(get_db)], skip: int = 0, limit: int = 64):
    return await get_all_district(db, skip, limit)

###########################################################################################################
######################################## DISTRICT API ENDPOINTS ###########################################
###########################################################################################################

###########################################################################################################
########################################### FOOD API ENDPOINTS ############################################
###########################################################################################################

@app.get("/api/v1/food/", response_model=list[Food])
async def get_district(db: Annotated[Session, Depends(get_db)], skip: int = 0, limit: int = 1000):
    return await get_all_food(db, skip, limit)

@app.get("/api/v1/food/{restaurant_id}/", response_model=list[Food])
async def restaurant_food(restaurant_id: int, token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)]):
    user = await get_current_user(token, db)
    if user.email is None:
        return False
    return await get_food_by_restaurant(db, restaurant_id)

###########################################################################################################
########################################### FOOD API ENDPOINTS ############################################
###########################################################################################################

###########################################################################################################
######################################## RESTAURANT API ENDPOINTS #########################################
###########################################################################################################

@app.get("/api/v1/restaurant/", response_model=list[Restaurant])
async def get_district(db: Annotated[Session, Depends(get_db)], skip: int = 0, limit: int = 1000):
    return await get_all_restaurant(db, skip, limit)

@app.get("/api/v1/restaurant/{district_id}", response_model=list[Restaurant])
async def district_restaurant(db: Annotated[Session, Depends(get_db)], district_id: int):
    return await get_restaurant_by_district(db, district_id)

@app.get("/api/v1/restaurant/profile/{restaurant_id}/", response_model=Restaurant)
async def get_restaurant_profile(restaurant_id: int, token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)]):
    user = get_current_user(token, db)
    if user.email is None:
        return False
    return await get_restaurant_by_id(db, restaurant_id)

###########################################################################################################
######################################## RESTAURANT API ENDPOINTS #########################################
###########################################################################################################