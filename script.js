

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");


const allCards = document.getElementById("all-cards");
let totalCountNumber = allCards.children.length;

function computeCount() {
    totalCount.innerText = totalCountNumber;
}
computeCount();


