# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from pyotp import TOTP
from sqlalchemy.orm import Session
from decouple import config
from .crud import get_current_user


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = config('ACCOUNT_SID')
auth_token = config('AUTH_TOKEN')
client = Client(account_sid, auth_token)
OTP_SECRET = "abcdefghijklMNOPQRSTUVWx"
topt = TOTP(OTP_SECRET, interval=300)


# print(topt.verify('904580'))

async def send_otp(token: str, db: Session):
    user = await get_current_user(token, db)
    print(user.phone)
    message = client.messages \
                .create(
                     body=f"Your OTP is {topt.now()}",
                     from_='+16198212933',
                     to='+8801850099956'
                 )

    print(message.sid)

def verify_otp(otp_str: str):
    return topt.verify(otp_str)