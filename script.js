const SUBJECTS=["English Language","Mathematics","Physics","Chemistry","Biology","Computer Science","Economics","Christian Religious Studies"];

function getStudents(){return JSON.parse(localStorage.getItem("stjoseph_students")||"[]")}
function saveStudents(s){localStorage.setItem("stjoseph_students",JSON.stringify(s))}
function show(id){["loginPage","studentPage","teacherPage"].forEach(x=>document.getElementById(x).classList.add("hidden"));document.getElementById(id).classList.remove("hidden")}

document.getElementById("subjects").innerHTML=SUBJECTS.map(s=>`<div class="subject-row"><input class="subj" value="${s}" readonly><input class="score" type="number" min="0" max="100" placeholder="Score" required></div>`).join("");

document.getElementById("loginForm").addEventListener("submit",e=>{
 e.preventDefault();
 const id=studentId.value.trim().toUpperCase(), cls=studentClass.value, pass=password.value;
 const s=getStudents().find(x=>x.id===id && x.class===cls && x.password===pass);
 if(!s){loginMsg.textContent="Invalid ID, class or password.";loginMsg.style.color="#b42318";return}
 loginMsg.textContent=""; document.getElementById("studentTitle").textContent=`Welcome, ${s.name}`;
 document.getElementById("studentMeta").innerHTML=`<strong>Student ID:</strong> ${s.id} &nbsp; | &nbsp; <strong>Class:</strong> ${s.class}`;
 document.getElementById("resultArea").innerHTML=`<table class="result-table"><thead><tr><th>Subject</th><th>Score</th><th>Grade</th></tr></thead><tbody>${s.results.map(r=>`<tr><td>${r.subject}</td><td>${r.score}</td><td>${grade(r.score)}</td></tr>`).join("")}</tbody></table><p class="total">Average: ${average(s.results)}%</p>`;
 show("studentPage");
});

document.getElementById("teacherBtn").onclick=()=>{
 const p=prompt("Enter teacher password:");
 if(p==="admin123"){renderStudents();show("teacherPage")}else alert("Incorrect teacher password.");
};

document.getElementById("resultForm").addEventListener("submit",e=>{
 e.preventDefault();
 const results=[...document.querySelectorAll(".subj")].map((el,i)=>({subject:el.value,score:Number(document.querySelectorAll(".score")[i].value)}));
 const student={id:rId.value.trim().toUpperCase(),name:rName.value.trim(),class:rClass.value,password:rPassword.value,results};
 let students=getStudents(); const index=students.findIndex(x=>x.id===student.id);
 if(index>=0)students[index]=student;else students.push(student); saveStudents(students);
 saveMsg.textContent="Result saved successfully.";saveMsg.style.color="#16794a";renderStudents();e.target.reset();
});

function renderStudents(){studentList.innerHTML=getStudents().length?getStudents().map(s=>`<div class="student-item"><strong>${s.name}</strong><br>${s.id} — ${s.class}<br>Average: ${average(s.results)}%</div>`).join(""):"No students uploaded yet."}
function average(r){return (r.reduce((a,b)=>a+b.score,0)/r.length).toFixed(1)}
function grade(n){return n>=70?"A":n>=60?"B":n>=50?"C":n>=45?"D":n>=40?"E":"F"}
function logout(){show("loginPage");document.getElementById("loginForm").reset()}
