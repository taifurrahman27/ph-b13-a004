let interviewList = [];
let rejectedList = [];
let currentStatus = "all"

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let availableJobsCount = document.getElementById("available-jobs-count");

const mainContainer = document.querySelector("main");
const allCards = document.getElementById("all-cards");
const deleteBtn = document.getElementById("delete-button");

document.addEventListener("click", function (event) {
    if (event.target.closest("i")) {
        const jobTitleParent = event.target.closest(".job-title").parentNode;
        const companyName = jobTitleParent.querySelector(".company-name")?.innerText;

        if (companyName) {
            interviewList = interviewList.filter(item => item.companyName != companyName);
            rejectedList = rejectedList.filter(item => item.companyName != companyName);
        }

        jobTitleParent.remove();
        computeCount();
        updateNoJobsState();
    }
    if (availableJobsCount) {
        if (currentStatus == "interview-btn") {
            availableJobsCount.innerText = `${interviewList.length} ${interviewList.length === 1 ? "job" : "jobs"}`;
        } else if (currentStatus == "rejected-btn") {
            availableJobsCount.innerText = `${rejectedList.length} ${rejectedList.length === 1 ? "job" : "jobs"}`;
        }
    }
});

const allJobsBtn = document.getElementById("all-jobs-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

const filterSection = document.getElementById("filter-section");
const noJobSection = document.getElementById("no-jobs-section");


function computeCount() {
    totalCount.innerText = allCards.children.length;
    const totalJobs = allCards.children.length;
    totalCount.innerText = totalJobs;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (availableJobsCount) {
        availableJobsCount.innerText = `${totalJobs} ${totalJobs === 1 ? "job" : "jobs"}`;
    }
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

    clicked.classList.remove("bg-white", "text-[#64748B]");
    clicked.classList.add("bg-blue-700", "text-white");

    if (id == "interview-btn") {
        allCards.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderInterview();
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
    updateNoJobsState();

}

mainContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("interview-btn")) {
        const parentName = event.target.parentNode.parentNode;

        const companyName = parentName.querySelector(".company-name").innerText;
        const position = parentName.querySelector(".position").innerText;
        const locationSalary = parentName.querySelector(".location-salary").innerText;
        const jobStatus = parentName.querySelector(".job-status").innerText;
        const jobDescription = parentName.querySelector(".job-description").innerText;

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

        if (currentStatus == "rejected-btn") {
            renderRejected();
        }
        computeCount();
        updateNoJobsState();

    }

    else if (event.target.classList.contains("rejected-btn")) {
        const parentName = event.target.parentNode.parentNode;

        const companyName = parentName.querySelector(".company-name").innerText;
        const position = parentName.querySelector(".position").innerText;
        const locationSalary = parentName.querySelector(".location-salary").innerText;
        const jobStatus = parentName.querySelector(".job-status").innerText;
        const jobDescription = parentName.querySelector(".job-description").innerText;

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
        updateNoJobsState();
    }
})

function renderInterview() {
    filterSection.classList.remove("space-y-4");
    filterSection.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4");
    filterSection.innerHTML = ""

    for (let interview of interviewList) {

        let div = document.createElement("div");
        div.className = "card-1 rounded-lg p-6 bg-[#FFFFFF]"

        div.innerHTML = `
                    <div class="job-title flex justify-between">
                        <div class="mb-3.5">
                            <h5 class="company-name font-bold text-[#002C5C] mb-2 text-xl ">${interview.companyName}</h5>
                            <p class="position text-[#64748B]">${interview.position}</p>
                        </div>
                        <button id="delete-button"><i class="fa-regular fa-trash-can"></i></button>
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
        `
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.classList.remove("space-y-4");
    filterSection.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4");
    filterSection.innerHTML = ""

    for (let rejected of rejectedList) {

        let div = document.createElement("div");
        div.className = "card-1 rounded-lg p-6 bg-[#FFFFFF]"

        div.innerHTML = `
                    <div class="job-title flex justify-between">
                        <div class="mb-3.5">
                            <h5 class="company-name font-bold text-[#002C5C] mb-2 text-xl ">${rejected.companyName}</h5>
                            <p class="position text-[#64748B]">${rejected.position}</p>
                        </div>
                        <button id="delete-button"><i class="fa-regular fa-trash-can"></i></button>
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
        `
        filterSection.appendChild(div);
    }
}

function updateNoJobsState() {
    if (currentStatus == "interview-btn") {
        noJobSection.classList.toggle("hidden", interviewList.length !== 0);
    }
    else if (currentStatus == "rejected-btn") {
        noJobSection.classList.toggle("hidden", rejectedList.length !== 0);
    }
    else {
        const isAllView = currentStatus == "all-jobs-btn" || currentStatus == "all";
        if (isAllView) {
            noJobSection.classList.toggle("hidden", allCards.children.length !== 0);
        }
    }
}
