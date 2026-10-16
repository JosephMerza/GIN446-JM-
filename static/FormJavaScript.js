var form = document.getElementById('profile_form');

var reviewPanel = document.createElement('section')
reviewPanel.id = 'review-panel';
reviewPanel.classList.add('panel');  

var reviewContent = document.createElement('div');
reviewContent.id = 'review-content';
reviewPanel.appendChild(reviewContent);

var editButton = document.createElement('input');
editButton.type = 'button';
editButton.id = 'edit-button';
editButton.value = 'Edit';
reviewPanel.appendChild(editButton);

var confirmButton = document.createElement('input');
confirmButton.type = 'button';
confirmButton.id = 'confirm-button';
confirmButton.value = 'Confirm & Submit';
reviewPanel.appendChild(confirmButton);

form.insertAdjacentElement('afterend', reviewPanel); /*
it Insert the review panel
immediately after the form. using afterend
*/


form.addEventListener("submit", function (e) { 
    e.preventDefault(); //prevent submission
 if (!form.checkValidity()) { //if form not valid
     form.reportValidity();  //report a validation msg
 return; 
 }
 const studentId = document.getElementById('student_id').value;
 const fullName =  document.getElementById('FullName').value;
 const email = document.getElementById('email').value;
 const phone = document.getElementById('phone').value;
 const birthdate = document.getElementById('birthdate').value;
 const githubUrl = document.getElementById('GithubUrl').value;
 const gin446Website = document.getElementById('RenderLink').value;
 const major = document.getElementById('EngMajor').value;
 const gpa =document.getElementById('GPA').value;
 const credits = document.getElementById('CreditsCompleted').value;
 const expectedGraduation = document.querySelector('input[name="graduation"]:checked')?.value; 
 const graduationMonth = document.getElementById('ExpectedGraduationMandY').value;
 const internship = document.querySelector('input[name="internship_completed"]:checked')?.value; 
 const skills = [...document.querySelectorAll('input[name="skills"]:checked')].map(cb => cb.value); 
 const primaryLanguage = document.getElementById('PrimaryProgLang').value;
 const software = [...document.getElementById("EngSoftwareUsed").selectedOptions].map(opt => opt.value);
 const projectTitle = document.getElementById('ProjectTitle').value;
 const projectArea = document.getElementById('ProjectArea').value;
 const projectDescription = document.getElementById('ProjectDescription').value;
 const teamSize = document.getElementById('TeamSize').value;
 const projectColor = document.getElementById('ProjDashboardColor').value;
 const meetingDate = document.getElementById('MeetingDate').value;
 const meetingTime = document.getElementById('MeetingTime').value;
 const confirmation = document.getElementById('Confirmation').checked; //1 value possible so i can put the check box to getElementById not Queryselector
  
reviewContent.textContent = "";
 
const studentIdOut = document.createElement("p");
studentIdOut.textContent = "Student ID: " + studentId;
reviewContent.appendChild(studentIdOut);

const fullNameOut = document.createElement("p");
fullNameOut.textContent = "Name: " + fullName;
reviewContent.appendChild(fullNameOut);

const emailOut = document.createElement("p");
emailOut.textContent = "USEK Email: " + email;
reviewContent.appendChild(emailOut);

const phoneOut = document.createElement("p");
phoneOut.textContent = "Mobile Number: " + phone;
reviewContent.appendChild(phoneOut);

const birthdateOut = document.createElement("p");
birthdateOut.textContent = "Date of Birth: " + birthdate;
reviewContent.appendChild(birthdateOut);

const githubUrlOut = document.createElement("p");
githubUrlOut.textContent = "GitHub: " + githubUrl;
reviewContent.appendChild(githubUrlOut);

const gin446WebsiteOut = document.createElement("p");
gin446WebsiteOut.textContent = "GIN446 Website: " + gin446Website;
reviewContent.appendChild(gin446WebsiteOut);

const majorOut = document.createElement("p");
majorOut.textContent = "Engineering Major: " + major;
reviewContent.appendChild(majorOut);

const gpaOut = document.createElement("p");
gpaOut.textContent = "GPA/100: " + gpa;
reviewContent.appendChild(gpaOut);

const creditsOut = document.createElement("p");
creditsOut.textContent = "Credits Completed: " + credits;
reviewContent.appendChild(creditsOut);

const expectedGraduationOut = document.createElement("p");
expectedGraduationOut.textContent = "Expected Graduation: " + expectedGraduation;
reviewContent.appendChild(expectedGraduationOut);

const graduationMonthOut = document.createElement("p");
graduationMonthOut.textContent = "Expected Graduation Month and Year: " + graduationMonth;
reviewContent.appendChild(graduationMonthOut);

const internshipOut = document.createElement("p");
internshipOut.textContent = "Engineering Internship Completed: " + internship;
reviewContent.appendChild(internshipOut);

const skillsOut = document.createElement("p");
skillsOut.textContent = "Technical Skills: " + (skills.join(", ") || "None selected");
reviewContent.appendChild(skillsOut);

const primaryLanguageOut = document.createElement("p");
primaryLanguageOut.textContent = "Primary Programming Language: " + primaryLanguage;
reviewContent.appendChild(primaryLanguageOut);

const softwareOut = document.createElement("p");
softwareOut.textContent = "Engineering Software Used: " + (software.join(", ") || "None selected");
reviewContent.appendChild(softwareOut);

const projectTitleOut = document.createElement("p");
projectTitleOut.textContent = "Proposed Project Title: " + projectTitle;
reviewContent.appendChild(projectTitleOut);

const projectAreaOut = document.createElement("p");
projectAreaOut.textContent = "Preferred Project Area: " + projectArea;
reviewContent.appendChild(projectAreaOut);

const projectDescriptionOut = document.createElement("p");
projectDescriptionOut.textContent = "Project Description: " + projectDescription;
reviewContent.appendChild(projectDescriptionOut);

const teamSizeOut = document.createElement("p");
teamSizeOut.textContent = "Preferred Team Size: " + teamSize;
reviewContent.appendChild(teamSizeOut);

const projectColorOut = document.createElement("p");
projectColorOut.textContent = "Project Dashboard Color: " + projectColor;
reviewContent.appendChild(projectColorOut);

const meetingDateOut = document.createElement("p");
meetingDateOut.textContent = "Preferred Meeting Date: " + meetingDate;
reviewContent.appendChild(meetingDateOut);

const meetingTimeOut = document.createElement("p");
meetingTimeOut.textContent = "Preferred Meeting Time: " + meetingTime;
reviewContent.appendChild(meetingTimeOut);

const confirmationOut = document.createElement("p");
confirmationOut.textContent = "Confirmation: " + (confirmation ? "Confirmed" : "Not confirmed");
reviewContent.appendChild(confirmationOut);

form.style.display = "none";
  reviewPanel.classList.add("open");
});
editButton.addEventListener('click', function() {
    reviewPanel.classList.remove('open');
    form.style.display = 'block';
});
confirmButton.addEventListener('click', function() {
    HTMLFormElement.prototype.submit.call(form); //ai debuging line not mine
});