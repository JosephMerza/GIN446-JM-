import re
from datetime import date
STUDENT_ID = re.compile(r"^\d{9}$")
FULLNAME = re.compile(r"^[A-Za-z][A-Za-z .'\-]{1,79}$")
EMAIL = re.compile(
    r"^[A-Za-z0-9._%+-]+@usek\.edu\.lb$",
    re.IGNORECASE
)
PHONE = re.compile(r"^\+961\s?\d{1,2}\s?\d{6,7}$")
GITHUB = re.compile(
    r"^https://github\.com/[A-Za-z0-9-]{1,39}/?$",
    re.IGNORECASE
)
HTTPS_URL = re.compile(r"^https://[^\s/]+(?:/[^\s]*)?$")
MONTH = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")
TIME = re.compile(r"^(?:[01]\d|2[0-3]):[0-5]\d$")
HEXCOLOR = re.compile(r"^#[0-9A-Fa-f]{6}$")
MAJORS = {"computer","electrical","biomedical","telecommunications"}
GRADUATION = {"spring","summer","fall"}
YESNO = {"yes","no"}
SKILLS = {"Programming","Embedded Systems","electronics","Computer Networks","Telecommunications","Biomedical Instrumentation","Artificial Intelligence / Machine Learning","Signal Processing"}
LANGUAGES = {"Python","C++","Java","C#","JavaScript","MATLAB","R","Go","Ruby","Swift"}
SOFTWARE = {"MATLAB","LabVIEW","AutoCAD","SolidWorks","Multisim","PSpice","Simulink","Altium Designer","ANSYS","COMSOL Multiphysics"}
PROJECT_AREAS = {"AI","Web Applications","Cybersecurity","Internet of Things","Power Systems","Renewable Energy","Control Systems","Medical Imaging","Biosensors","Medical Devices","Wireless Communications","5G / 6G Networks"}
REQUIRED = { "student_id","fullname","email","phone","birthdate","portfolio","gin446","major","gpa","credits","graduation","graduation_month","internship_completed","language","software","project_area","description","team_size","meeting_date","meeting_time","confirmation"}

def parse_date(text):
    try:
        return date.fromisoformat(text)
    except ValueError:
        return None

def to_number(text):
    try:
        return float(text)
    except ValueError:
        return None

def to_int(text): 
    try: 
        if not re.match(r"\d+", text): 
            return None 
        return int(text)  
    except ValueError:  
        return None  
  

def validate_profile(form):
    errors = {}
    cleaned = {}
    for field in REQUIRED:
        if form.get(field, "").strip() == "":
            errors[field] = "This field is required."
    student_id = form.get("student_id", "").strip()
    if student_id != "" and not STUDENT_ID.match(student_id):
        errors["student_id"] = "Student ID must be exactly 9 digits."
    cleaned["student_id"] = student_id  

    fullname = form.get("fullname","").strip()
    if fullname and not FULLNAME.match(fullname):
        errors["fullname"] = "Use letters, spaces, hyphens or apostrophes (2-80 chars)."
    cleaned["fullname"] = fullname  

    email = form.get("email", "").strip().lower()
    if email and not EMAIL.match(email):
        errors["email"] = "Use your USEK email (...@net.usek.edu.lb)."
    cleaned["email"] = email

    phone = form.get("phone", "").strip()
    if phone and not PHONE.match(phone):
        errors["phone"] = "Enter a valid Lebanese number, e.g. +961 70 123456."
    cleaned["phone"] = phone

    birthdate = form.get("birthdate", "").strip()
    if birthdate != "":
        day = parse_date(birthdate)
        if day is None:
            errors["birthdate"] = "Not a valid date."
        elif day > date.today():
            errors["birthdate"] = "Date of birth cannot be in the future."
        else:
            age = (date.today() - day).days // 365
            if age < 15 or age > 100:
                errors["birthdate"] = "Age looks out of range."
    cleaned["birthdate"] = birthdate

    portfolio = form.get("portfolio", "").strip()
    if portfolio and not GITHUB.match(portfolio):
       errors["portfolio"] = "Use a GitHub URL: https://github.com/username"
    cleaned["portfolio"] = portfolio

    gin446 = form.get("gin446", "").strip()
    if gin446 and not HTTPS_URL.match(gin446):
        errors["gin446"] = "Enter a valid https:// link."
    cleaned["gin446"] = gin446

    major = form.get("major", "").strip().lower()
    if major != "" and major not in MAJORS:
        errors["major"] = "Choose a valid major."
    cleaned["major"] = major

    gpa = form.get("gpa", "").strip()
    if gpa != "":
        number = to_number(gpa)
        if number is None or number (40 <= number <= 100) :
            errors["gpa"] = "GPA must be a number between 40 and 100."
    cleaned["gpa"] = gpa

    credits_text = form.get("credits", "").strip()   #AI
    if not credits_text:
        errors["credits"] = "Credits completed is required."
    else:
        credits = to_int(credits_text)
        if credits is None:
            errors["credits"] = "Credits must be a whole number."
        elif not 0 <= credits <= 146:
            errors["credits"] = "Credits must be between 0 and 146."  
        else:
            cleaned["credits"] = credits

    graduation = form.get("graduation", "").strip()
    if graduation != "" and graduation not in GRADUATION:
        errors["graduation"] = "Choose spring, summer or fall."
    cleaned["graduation"] = graduation  

    graduation_month = form.get("graduation_month", "").strip()
    if graduation_month != "" and not MONTH.match(graduation_month):
        errors["graduation_month"] = "Use the month picker (YYYY-MM)."
    cleaned["graduation_month"] = graduation_month   

    internship = form.get("internship_completed", "").strip()
    if internship and internship not in YESNO:
        errors["internship_completed"] = "Choose yes or no."
    cleaned["internship_completed"] = internship 

    language = form.get("language","").strip()
    if len(language)>40:
        errors["language"] = "Keep it under 40 characters."
    cleaned["language"] = language

    skills = form.getlist("skills")
    good_skills = []
    bad_skills = []
    for skill in skills:
        if skill in SKILLS:
            good_skills.append(skill)
        else:
            bad_skills.append(skill)
    if bad_skills:
        errors["skills"] = "Unknown skill(s): " + ", ".join(bad_skills)
    cleaned["skills"] = good_skills

    software = form.getlist("software")
    valid_software = []
    invalid_software = []
    for item in software:
        if item in SOFTWARE:
            valid_software.append(item)
        else:
            invalid_software.append(item)    
    if invalid_software:
        errors["software"] = "Unknown software: " + ", ".join(invalid_software)
    cleaned["software"] = valid_software

    project_title = form.get("project_title","").strip()
    if len(project_title)>120:
        errors["project_title"] = "Title must be 120 characters or fewer."
    cleaned["project_title"] = project_title

    project_area = form.get("project_area","").strip()
    if project_area and project_area not in PROJECT_AREAS:
        errors["project_area"] = "Choose a valid project area."
    cleaned["project_area"] = project_area

    description = form.get("description","")
    if len(description)>100:
        errors["description"] = "Description must be 100 characters or fewer."
    cleaned["description"] = description 

    team_size = form.get("team_size", "").strip()
    if team_size != "":
        number = to_int(team_size)
        if number is None or number < 1 or number > 4:
            errors["team_size"] = "Team size must be a whole number from 1 to 4."
    cleaned["team_size"] = team_size

    project_color = form.get("project_color", "").strip()
    if project_color != "" and not HEXCOLOR.match(project_color):
        errors["project_color"] = "Use a colour like #336699."
    if project_color == "":
        project_color = "#336699"
    cleaned["project_color"] = project_color

    meeting_date = form.get("meeting_date", "").strip()
    if meeting_date and not parse_date(meeting_date):
        errors["meeting_date"] = "Not a valid date."
    cleaned["meeting_date"] = meeting_date

    meeting_time = form.get("meeting_time","")
    if not TIME.fullmatch(meeting_time):
        errors["meeting_time"] = "Use HH:MM"
    elif not "08:00" <= meeting_time <= "18:00":
        errors["meeting_time"] = "Pick a time between 08:00 and 18:00."
    cleaned["meeting_time"] = meeting_time

    confirmation = form.get("confirmation","")
    if confirmation != "yes":
        errors["confirmation"] = "You must confirm the information is accurate"
    cleaned["confirmation"] = confirmation

    return errors, cleaned


    


