let HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 403
}


module.exports = {
    OK_200 :{
       "success":"" 
    },
    BAD_REQUEST_400: {
        'error_operation': 'the Operation successfully completed.',
        'error_input': 'Please enter all the fields',
        'illegal_info': 'مقدار وارده غیر مجاز است',
        'not_found': 'موردی با این مشخصات یافت نشد',
        'enter_permission': 'لطفا مجوز را وارد کنید',
        'duplicate_info': 'اطلاعات وارد شده تکراری می باشد',
        'duplicate_file_name': 'نام فایل تکراری است',
        'duplicate_record': 'رکورد تکراری',
        'send_active_status': 'لطفا فعال یا غیر فعال بودن را مشخص کنید',
        'verification_code_not_match': 'کد تایید تطابق ندارد',
        'otp_send_error': 'ارسال رمز عبور یکبار مصرف با مشکل مواجه شد',
        'otp_generate_error': 'تولید رمز عبور با شکست مواجه شد',
        'verification_code_error':'خطا در ارسال کد تایید'

    },
    NOT_FOUND_404: {
        'not_found': 'مقداری وجود ندارد'
    },
    UNAUTHORIZED_403: {
        'no_access_permission': 'خطا: عدم مجوز دسترسی',
    },
    INTERNAL_SERVER_500: {
        'server_error': 'error in server side !',
        'enter_condition': 'حداقل یک شرط را وارد کنید'
    }
}