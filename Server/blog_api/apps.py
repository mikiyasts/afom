from django.apps import AppConfig


class BlogApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog_api'

class CollectionApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'collection_api'