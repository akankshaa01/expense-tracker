from django.shortcuts import render
from django.http import JsonResponse
from .models import Expense
from django.views.decorators.csrf import csrf_exempt
import json

def get_expenses(request):
    expenses = list(Expense.objects.values())
    return JsonResponse(expenses,safe=False)

@csrf_exempt
def add_expense(request):
    if request.method == "POST":
        data = json.loads(request.body)

        expense = Expense.objects.create(
            title=data.get("title"),
            amount=data.get("amount")
        )

        return JsonResponse({
            "id": expense.id,
            "title": expense.title,
            "amount": expense.amount
        })

@csrf_exempt
def delete_expense(request, id):
    if request.method == "DELETE":
        try:
            expense = Expense.objects.get(id=id)
            expense.delete()
            return JsonResponse({"message": "Deleted successfully"})
        except Expense.DoesNotExist:
            return JsonResponse({"error": "Not found"}, status=404)

@csrf_exempt
def update_expense(request, id):
    if request.method == "PUT":
        data = json.loads(request.body)

        try:
            expense = Expense.objects.get(id=id)

            expense.title = data.get("title")
            expense.amount = data.get("amount")
            expense.save()

            return JsonResponse({
                "id": expense.id,
                "title": expense.title,
                "amount": expense.amount
            })

        except Expense.DoesNotExist:
            return JsonResponse({"error": "Not found"}, status=404)