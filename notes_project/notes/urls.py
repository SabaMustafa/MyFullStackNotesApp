from django.urls import path
from .views import (
    NoteCreateView,
    NoteListView,
    NoteUpdateView,
    NoteDeleteView,
    NoteSearchView,
    NoteFilterView,
    NoteTagView
)

urlpatterns = [
    path('create/', NoteCreateView.as_view(), name='note-create'),
    path('notes/', NoteListView.as_view(), name='note-list'),
    path('update/<int:pk>/', NoteUpdateView.as_view(), name='note-update'),
    path('delete/<int:pk>/', NoteDeleteView.as_view(), name='note-delete'),
    path('search/', NoteSearchView.as_view(), name='note-search'),
    path('filter/', NoteFilterView.as_view(), name='note-filter'),
    path('tags/<int:pk>/', NoteTagView.as_view(), name='note-tag'),
]
