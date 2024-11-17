from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
# from .database import Base

Base =  declarative_base()

class User(Base):
    __tablename__ = "users"

    id=Column(Integer, primary_key=True, nullable=False)
    full_name=Column(String(80), nullable=False)
    email = Column(String(50), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=False)
    division = Column(String(20), nullable=False)
    district = Column(String(20), nullable=False)
    address = Column(String(250), nullable=False)
    # hashed_password = Column(String(250))
    salt=Column(String(250), nullable=False)
    special_key=Column(String(250), nullable=False)
    photo_url=Column(String(250), nullable=False)
    is_active = Column(Boolean, default=False)

    items = relationship("Item", back_populates="owner")

class Password(Base):
    __tablename__ = "passwords"

    hashed_key = Column(String(250), primary_key=True, nullable=False)
    hashed_password = Column(String(250), nullable=False)

class District(Base):
    __tablename__ = 'management_district'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    image_url = Column(String(255), nullable=False)

    restaurants = relationship("Restaurant", back_populates="district")

class Food(Base):
    __tablename__ = 'management_food'

    id = Column(Integer, primary_key=True)
    food_name = Column(String(50), nullable=False)
    food_image = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    ratings = Column(Float, nullable=False)
    number_of_raters = Column(Integer, nullable=False)
    restaurant_id = Column(Integer, ForeignKey('management_restaurant.id'))

    restaurant = relationship("Restaurant", back_populates="foods")

class Restaurant(Base):
    __tablename__ = 'management_restaurant'

    id = Column(Integer, primary_key=True)
    restaurant_name = Column(String(255), nullable=False)
    restaurant_address = Column(String(255), nullable=False)
    cover_photo = Column(String(255), nullable=False)
    ratings = Column(Float, nullable=False)
    number_of_raters = Column(Integer, nullable=False)
    district_id = Column(Integer, ForeignKey('management_district.id'))

    district = relationship("District", back_populates="restaurants")
    foods = relationship("Food", back_populates="restaurant")



##########################################
# ************************************** #
##########################################


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String(50), index=True, nullable=False)
    description = Column(String(250), index=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="items")

class Customer(Base):
    __tablename__ = 'customer'

    customer_id = Column(Integer, primary_key=True, nullable=False)
    cust_name = Column(String(50), nullable=False)
    city = Column(String(50), nullable=False)
    grade = Column(Integer, nullable=False)
    salesman_id = Column(Integer, ForeignKey('salesman.salesman_id'))

    salesman = relationship('Salesman', back_populates='customers')
    orders = relationship('Order', back_populates='customer')

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, nullable=False)
    quantity = Column(Integer, nullable=False)
    ord_date = Column(Date, nullable=False)
    customer_id = Column(Integer, ForeignKey('customer.customer_id'))
    salesman_id = Column(Integer, ForeignKey('salesman.salesman_id'))

    customer = relationship('Customer', back_populates='orders')
    salesman = relationship('Salesman', back_populates='orders')

class Office(Base):
    __tablename__ = 'office'

    DEPARTMENT_ID = Column(Integer, primary_key=True, nullable=False)
    DEPARTMENT_NAME = Column(String(50), nullable=False)
    MANAGER_ID = Column(Integer, nullable=False)
    LOCATION_ID = Column(Integer, nullable=False)

class Salesman(Base):
    __tablename__ = 'salesman'

    salesman_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(50), nullable=False)
    city = Column(String(50), nullable=False)
    commission = Column(Float, nullable=False)

    customers = relationship('Customer', back_populates='salesman')
    orders = relationship('Order', back_populates='salesman')