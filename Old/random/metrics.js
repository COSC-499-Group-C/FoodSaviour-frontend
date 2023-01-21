
function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";



    class OrgGroups(models.Model):
    //     u_delete=models.CASCADE)
    //     group = models.ForeignKey(Organizations, on_delete=models.CASCADE)
    
    //     class Meta:
    //         verbose_name_plural = "OrgGroups"
    //         unique_together = ["user", "group"]
    
        
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length-1) {

        document.getElementById("nextprevious").style.display = "none";


    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }

