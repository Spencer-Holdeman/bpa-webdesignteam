const memberMenu = document.querySelector("#member-menu");
const memberDesriptions = [
    "Landon is a prodigy with an exceptional ability to quickly learn and master songs by ear. His natural talent for intricate melodies and complex structures lets him seamlessly adapt to any musical style. Whether it’s a fast-paced riff or a delicate ballad, Landon’s ear for music is unparalleled, and his technical skill is matched by the emotional depth he brings to every performance.",
    "Spencer is an incredible drummer who has spent most of his life learning and perfecting the instrument. He started playing when he was just 11 and is now 17. Spencer takes most of his inspiration from drummers such as matthew mcDonough, Elliot Hoffman, Kenny Grohowski, and Tomas Haake. He dedicates his music to his parents, friends, and most of all, God.",
    "Connor Crossley is a bassist whose talent blends the styles of legends like Steve Harris, Geddy Lee, Alex Webster, and Les Claypool into a sound all his own. His dedication, even at the cost of losing hearing in one ear, drives the depth and power he brings to Stage Fright's albums Vexed, Failure to Cope, and The Fall of Autumn.",
    "David is an electrifying singer with a voice that can silence a room in awe or ignite the energy of a thousand people. His performances leave audiences stunned, captivated by his incredible vocal range and the sheer power he brings to every note, as each one resonates and bounces off the walls, leaving a lasting impression."
]
function openAboutMember(member) {
    const body = document.querySelector("body");
    let memberPic = document.querySelector("#member-menu-pic");
    let memberInfo = document.querySelector("#member-menu-info");
    body.classList.add("overflow-y-hidden");
    memberPic.src = member.getAttribute("data-picture");
    memberInfo.children[0].innerText = member.children[1].innerText;
    memberInfo.children[1].innerText = member.children[2].innerText;
    memberInfo.children[3].innerText = memberDesriptions[member.getAttribute("data-id")];
    memberMenu.classList.toggle("hidden");
    window.scrollTo({ top: 0 });
}
function closeAboutMember() {
    const body = document.querySelector("body");
    body.classList.remove("overflow-y-hidden");
    memberMenu.classList.toggle("hidden");
}

