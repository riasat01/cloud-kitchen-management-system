from pydantic import BaseModel

class UserBase(BaseModel):
    full_name: str
    email: str
    phone: str
    division: str
    district: str
    address: str
    photo_url: str

class UserCreate(UserBase):
    password: str
    # salt: str
    # special_key: str

class User(UserBase):
    # id: int
    is_active: bool
    # items: list[Item] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_email: str | None = None

class PasswordBase(BaseModel):
    hashed_key: str
    hashed_password: str

class PasswrodCreate(PasswordBase):
    pass

class OTP(BaseModel):
    otp: str

class DistrictBase(BaseModel):
    name: str
    image_url: str

class District(DistrictBase):
    id: int

    class Config:
        from_attributes = True

class RestaurantBase(BaseModel):
    restaurant_name: str
    restaurant_address: str
    cover_photo: str
    ratings: float
    number_of_raters: int
    district_id: int

class RestaurantCreate(RestaurantBase):
    pass

class Restaurant(RestaurantBase):
    id: int

    class Config:
        from_attributes = True

class FoodBase(BaseModel):
    food_name: str
    food_image: str
    price: float
    ratings: float
    number_of_raters: int
    restaurant_id: int

class FoodCreate(FoodBase):
    pass

class Food(FoodBase):
    id: int

    class Config:
        from_attributes = True


##########################################
# ************************************** #
##########################################


# class ItemBase(BaseModel):
#     title: str
#     description: str | None = None

# class ItemCreate(ItemBase):
#     pass

# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         from_attributes = True
