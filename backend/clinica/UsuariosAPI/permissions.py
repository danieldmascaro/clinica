from rest_framework import permissions

class HoraPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method in ['POST', 'DELETE'] and request.user.is_authenticated and request.user.tipo_usuario in ['medico', 'admin']:
            return True
        
        return False