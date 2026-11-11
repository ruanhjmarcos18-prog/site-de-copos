document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('email').value && document.getElementById('senha').value) {
        localStorage.setItem('autenticado', 'true');
        window.location.href = "dashboard.html";
    } else {
        document.getElementById('loginError').style.display = "block";
    }
});
