

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent



SECRET_KEY = 'django-insecure-3ootb#&yv0h&-*#=d=n0yco86dfs@wne=ps+el$!#p8b*wj+kd'


DEBUG = True

ALLOWED_HOSTS = ['localhost']

CORS_EXPOSE_HEADERS = ['Access-Control-Allow-Credentials']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'UsuariosAPI',
    'rest_framework',
    'django_filters',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    'djoser', 
]

CSRF_COOKIE_HTTPONLY = False  # Para que JavaScript pueda acceder a la cookie

CSRF_COOKIE_SECURE = False  # En desarrollo, lo puedes dejar como False

CORS_ALLOW_CREDENTIALS = True

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = 'clinica.urls'

import os

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'usuariosAPI', 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'clinica.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'CLINICA',
        'USER': 'root',
        'PASSWORD' : 'chaitos123',
        'HOST' : 'localhost',
        'PORT' : '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

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

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

DJOSER = {
    'USER_ID_FIELD': 'rut',
    'TOKEN_MODEL': None,
    'USER_CREATE_PASSWORD_RETYPE': True,
    'SEND_ACTIVATION_EMAIL': True,
    'ACTIVATION_URL': 'auth/activate/{uid}/{token}',
    'SERIALIZERS': {
        'user_create': 'UsuariosAPI.serializers.CustomUserSerializer',
        'user': 'UsuariosAPI.serializers.CustomUserSerializer',
        },
}


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "UsuariosAPI.CustomUser"

MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR / 'media'

DOMAIN = 'localhost:5173'

SITE_NAME = 'clinica'

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:5174',
]

CORS_ALLOW_METHODS = (
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
)

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  
]


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'djangoproyectoclinica@gmail.com'
EMAIL_HOST_PASSWORD = 'ieqwzzuvbnecdmjm'
DEFAULT_FROM_EMAIL = 'djangoproyectoclinica@gmail.com'