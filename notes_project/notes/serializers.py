from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'tags', 'created_at', 'updated_at']  # ❌ DO NOT include 'user'

    def create(self, validated_data):
        # The user will be set manually in the view, not here
        return Note.objects.create(**validated_data)
