"""
Django settings for blogsite project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-5%a8gdzd9%nd@eg1q128^8w23dmid-kic64xytyw*nuzq*&%+6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG=True
CORS_ALLOW_CREDENTIALS = True
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'          
EMAIL_PORT = 587                         
EMAIL_HOST_USER = 'mtkdomain@gmail.com'  
EMAIL_HOST_PASSWORD = 'woujqwrelrmarstx'    
EMAIL_USE_TLS = True                    
DEFAULT_FROM_EMAIL = 'mtkdomain@gmail.com'  



CSRF_COOKIE_NAME = "csrftoken"
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]

# CORS_ORIGIN_WHITELIST = (
#     'http://localhost:3000',  # React default port = 3000
#     'https://afombridal.com',  # Django default port = 8000
# )
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blogApp.apps.BlogappConfig',
    'django.contrib.humanize',
    
    
    'rest_framework',
    'blog_api',
    'corsheaders',
    'rest_framework.authtoken',
    'collection',
    'appointment',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
   'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
]
CORS_ORIGIN_ALLOW_ALL=True
CORS_ALLOWED_ORIGINS = [
   
    "http://localhost:3000",
    
]
ROOT_URLCONF = 'blogsite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATA_UPLOAD_MAX_MEMORY_SIZE = 1073741824




# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',  # Use 'django.db.backends.mysql' for mysqlclient
#         'NAME': 'afombrtu_website',                   # Your database name
#         'USER': 'afombrtu_afom',                       # Your database user
#         'PASSWORD': 'a.Zm*vuZoW3O',               # Your database password
#         'HOST': '192.250.239.87',                    # Set to 'localhost' or your database server IP
#         'PORT': '',  
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'afombrtu_website',
#         'USER': 'afombrtu_afom',
#         'PASSWORD': 'a.Zm*vuZoW3O',
#         'HOST': '192.250.239.87',
#         'PORT': '',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework.authentication.TokenAuthentication',
#     ),
#     'DEFAULT_PERMISSION_CLASSES': (
#         'rest_framework.permissions.IsAuthenticated',
#     ),
# }

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'blog_api.authentication.APIKeyAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}



# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = '/static/'



STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),  # Folder for your static files (CSS, JS, etc.)
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media files (User uploads like blog post images)


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MEDIA_URL = '/media/'



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LOGIN_REDIRECT_URL = '/'
LOGIN_URL = '/login'

