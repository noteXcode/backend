
const HttpStatusCode = {
    OK_200: 200,
    Created_201: 201,
    Accepted_202: 202,
    BadRequest400: 400,
    Unauthorized_401: 401,
    Forbidden_403: 403,
    NotFound_404: 404,
    InternalServerError_500: 500,
}

const ResponseCode = {
    'success': 0,
    'error_input': 1,
    'duplicate_record': 2,
    'not_found': 3,
    'internal_error': 4,
    'expired': 5,
    'notAccess': 6,
}
const ResponseType = {
    'error': 'error',
    'success': 'success',
    'warning': 'warning',
    'info': 'info',
    'delete': 'delete',
}
const ResponseMessages = {
    // success
    'success': 'عملیات با موفقیت انجام شد',
    // Created_201
    'created': 'با موفقیت ایجاد شد',
    // user
    'user_is_not_active': 'کاربر فعال نمی باشد',
    'user_password_not_valid':'رمز عبور یا نام کاربری صحیح نمی باشد',
    'user_is_active': 'کاربر فعال می باشد',
    'user_is_not_found': 'کاربری بااین مشخصات یافت نشد',
    'user_is_exist': 'کاربر قبلا ثبت نام شده است',
    // errors
    'not_found': 'موردی با این مشخصات یافت نشد',
    'error_input': 'لطفا مقادیر را کامل کنید',
    'duplicate_record': 'رکورد تکراری',
    // files 
    'select_file': 'یک فایل را انتخاب کنید',
    // otp && verify
    'otp_expired': 'زمان استفاده از رمز عبور یکبار مصرف به پایان رسیده',
    'otp_send_error': 'ارسال رمز عبور یکبار مصرف با مشکل مواجه شد',
    'otp_generate_error': 'تولید رمز عبور با شکست مواجه شد',
    'verification_code_error': 'خطا در ارسال کد تایید',
    'verification_code_not_match': 'کد تایید تطابق ندارد',
    // authorized
    'no_access_permission': 'دسترسی وجود ندارد',
    // server error
    'server_error': 'خطا: خطا در سمت سرور',
}

module.exports = {
    ResponseMessages,
    HttpStatusCode,
    ResponseCode,
    ResponseType
}