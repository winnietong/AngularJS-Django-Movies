# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Favorite'
        db.create_table(u'movies_app_favorite', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('poster', self.gf('django.db.models.fields.URLField')(max_length=200)),
            ('movieID', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'movies_app', ['Favorite'])


    def backwards(self, orm):
        # Deleting model 'Favorite'
        db.delete_table(u'movies_app_favorite')


    models = {
        u'movies_app.favorite': {
            'Meta': {'object_name': 'Favorite'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'movieID': ('django.db.models.fields.IntegerField', [], {}),
            'poster': ('django.db.models.fields.URLField', [], {'max_length': '200'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['movies_app']