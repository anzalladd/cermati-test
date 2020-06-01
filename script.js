let isShowPanel = false;
let isHaveBeenClose = false;
const panel = $("#newslatter");
const notification = $("#notification");

function hideNotification() {
  notification.addClass("hide--notification");
}

function closePanel() {
  hidePanel();
  const date = new Date();
  date.setMinutes(date.getMinutes() + 10);
  localStorage.setItem("time_expired", JSON.stringify(date));
}

function hidePanel() {
  panel.removeClass("show--newslatter");
  panel.addClass("hide--newslatter");
}

function showPanel() {
  panel.removeClass("hide--newslatter");
  panel.addClass("show--newslatter");
}

function checkExpiration() {
  const expired = JSON.parse(localStorage.getItem("time_expired"));
  const current_time = JSON.parse(JSON.stringify(new Date()));
  if (expired) {
    isHaveBeenClose = true;
    if (expired < current_time) {
      localStorage.removeItem("time_expired");
      isHaveBeenClose = false;
    }
  } else {
    isHaveBeenClose = false;
  }
}

$(document).ready(function () {
  checkExpiration();
  $(window).scroll(function () {
    const currentPosition = $(window).scrollTop();
    const documentHeight = $(document).height() / 10;
    if (currentPosition >= documentHeight) {
      if (!isShowPanel && !isHaveBeenClose) {
        isShowPanel = true;
        showPanel();
      }
    }
  });
});
