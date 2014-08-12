from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'movies.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'movies_app.views.home', name='home'),
    url(r'^add_favorite/$', 'movies_app.views.add_favorite', name='add_favorite'),

    url(r'^angular/$', 'movies_app.views.angular', name='angular'),
)
