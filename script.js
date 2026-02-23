let interviewList = [];
let rejectedList = [];
let currentStatus = "all"

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");


const allCards = document.getElementById("all-cards");
let totalCountNumber = allCards.children.length;

const mainContainer = document.querySelector("main");

const allJobsBtn = document.getElementById("all-jobs-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

const filterSection = document.getElementById("filter-section");

function computeCount() {
    totalCount.innerText = totalCountNumber;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

computeCount();


function toggleBtn(id) {

    allJobsBtn.classList.add("bg-white", "text-[#64748B]");
    interviewBtn.classList.add("bg-white", "text-[#64748B]");
    rejectedBtn.classList.add("bg-white", "text-[#64748B]");

    allJobsBtn.classList.remove("bg-blue-700", "text-white");
    interviewBtn.classList.remove("bg-blue-700", "text-white");
    rejectedBtn.classList.remove("bg-blue-700", "text-white");

    const clicked = document.getElementById(id);

    currentStatus = id;

    clicked.classList.add("bg-blue-700", "text-white");
    clicked.classList.remove("bg-white", "text-[#64748B]");

    if (id == "interview-btn") {
        allCards.classList.add("hidden");
        filterSection.classList.remove("hidden");
    }
    else if (id == "all-jobs-btn") {
        allCards.classList.remove("hidden");
        filterSection.classList.add("hidden");
    }
    else if (id == "rejected-btn") {
        allCards.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderRejected();
    }

}

mainContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("interview-btn")) {
        const parentName = event.target.parentNode.parentNode;

        const companyName = parentName.querySelector(".company-name").innerText
        const position = parentName.querySelector(".position").innerText
        const locationSalary = parentName.querySelector(".location-salary").innerText
        const jobStatus = parentName.querySelector(".job-status").innerText
        const jobDescription = parentName.querySelector(".job-description").innerText

        parentName.querySelector(".job-status").innerText = "INTERVIEW"

        const jobDetails = {
            companyName,
            position,
            locationSalary,
            jobStatus,
            jobDescription,
        }

        const jobExist = interviewList.find(item => item.companyName == jobDetails.companyName)

        if (!jobExist) {
            interviewList.push(jobDetails);
        }
        rejectedList = rejectedList.filter(item => item.companyName != jobDetails.companyName);
        computeCount();

        renderInterview();
    }
    else if (event.target.classList.contains("rejected-btn")) {
        const parentName = event.target.parentNode.parentNode;

        const companyName = parentName.querySelector(".company-name").innerText
        const position = parentName.querySelector(".position").innerText
        const locationSalary = parentName.querySelector(".location-salary").innerText
        const jobStatus = parentName.querySelector(".job-status").innerText
        const jobDescription = parentName.querySelector(".job-description").innerText

        parentName.querySelector(".job-status").innerText = "REJECTED"

        const jobDetails = {
            companyName,
            position,
            locationSalary,
            jobStatus,
            jobDescription,
        }

        const jobExist = rejectedList.find(item => item.companyName == jobDetails.companyName)

        if (!jobExist) {
            rejectedList.push(jobDetails);
        }
        interviewList = interviewList.filter(item => item.companyName != jobDetails.companyName);

        if (currentStatus == "interview-btn") {
            renderInterview();
        }

        computeCount();

    }
})

function renderInterview() {
    filterSection.innerHTML = ""

    for (let interview of interviewList) {

        let div = document.createElement("div");
        div.className = "cards space-y-4 md:grid grid-cols-2 gap-2"

        div.innerHTML = `
        <div class="card-1 p-6 bg-[#FFFFFF]">
                    <div class="job-title flex justify-between">
                        <div class="mb-3.5">
                            <h5 class="company-name font-bold text-[#002C5C] mb-2 text-xl ">${interview.companyName}</h5>
                            <p class="position text-[#64748B]">${interview.position}</p>
                        </div>
                        <button><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                    <p class="location-salary text-[#64748B] my-3 text-sm">${interview.locationSalary}</p>
                    <button class="job-status text-[#002C5C] bg-[#EEF4FF] py-2 px-3 mb-2 text-sm">INTERVIEW</button>
                    <p class="job-description text-[#323B49] text-sm">${interview.jobDescription}</p>
                    <div class="flex gap-1.5 mt-3">
                        <button
                            class="interview-btn text-[#10B981] bg-[#EEF4FF] border border-solid border-b-green-500 rounded-md font-bold py-2 px-3 text-sm">
                            INTERVIEW
                        </button>
                        <button
                            class="rejected-btn text-[#EF4444] bg-[#EEF4FF] border border-solid border-b-red-500 rounded-md font-bold py-2 px-3 text-sm">
                            REJECTED
                        </button>
                    </div>
                </div>
        `
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = ""

    for (let rejected of rejectedList) {

        let div = document.createElement("div");
        div.className = "cards space-y-4 md:grid grid-cols-2 gap-2"

        div.innerHTML = `
        <div class="card-1 p-6 bg-[#FFFFFF]">
                    <div class="job-title flex justify-between">
                        <div class="mb-3.5">
                            <h5 class="company-name font-bold text-[#002C5C] mb-2 text-xl ">${rejected.companyName}</h5>
                            <p class="position text-[#64748B]">${rejected.position}</p>
                        </div>
                        <button><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                    <p class="location-salary text-[#64748B] my-3 text-sm">${rejected.locationSalary}</p>
                    <button class="job-status text-[#002C5C] bg-[#EEF4FF] py-2 px-3 mb-2 text-sm">REJECTED</button>
                    <p class="job-description text-[#323B49] text-sm">${rejected.jobDescription}</p>
                    <div class="flex gap-1.5 mt-3">
                        <button
                            class="interview-btn text-[#10B981] bg-[#EEF4FF] border border-solid border-b-green-500 rounded-md font-bold py-2 px-3 text-sm">
                            INTERVIEW
                        </button>
                        <button
                            class="rejected-btn text-[#EF4444] bg-[#EEF4FF] border border-solid border-b-red-500 rounded-md font-bold py-2 px-3 text-sm">
                            REJECTED
                        </button>
                    </div>
                </div>
        `
        filterSection.appendChild(div);
    }
}