const fs = require('fs');

function addModalKeys(lang) {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (lang === 'en') {
    data.ServicesPage.modal = {
      relatedProjects: "Related Projects",
      bookFormTitle: "Book This Service",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      projectNameLabel: "Project Name",
      budgetLabel: "Estimated Budget",
      timeframeLabel: "Project Timeframe",
      descriptionLabel: "Project Details & Requirements",
      cancel: "Cancel",
      submit: "Submit Booking Request",
      submitting: "Submitting...",
      success: "Booking request sent successfully!",
      error: "Failed to send request. Please try again."
    };
  } else {
    data.ServicesPage.modal = {
      relatedProjects: "Dự Án Liên Quan",
      bookFormTitle: "Đặt Dịch Vụ Này",
      nameLabel: "Tên Của Bạn",
      emailLabel: "Địa Chỉ Email",
      projectNameLabel: "Tên Dự Án",
      budgetLabel: "Ngân Sách Dự Kiến",
      timeframeLabel: "Khung Thời Gian",
      descriptionLabel: "Chi Tiết & Yêu Cầu Dự Án",
      cancel: "Hủy",
      submit: "Gửi Yêu Cầu Đặt Lịch",
      submitting: "Đang gửi...",
      success: "Đã gửi yêu cầu đặt lịch thành công!",
      error: "Gửi yêu cầu thất bại. Vui lòng thử lại."
    };
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

addModalKeys('en');
addModalKeys('vi');
