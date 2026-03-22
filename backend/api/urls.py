from django.urls import path
from .views import get_expenses, add_expense, delete_expense, update_expense

urlpatterns = [
    path('expenses/', get_expenses),
    path('add/', add_expense),
    path('delete/<int:id>/', delete_expense),
    path('update/<int:id>/', update_expense),
]