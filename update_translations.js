const fs = require('fs');

const servicesDataEn = {
  hero: {
    subtitle: "Engineered Intelligence",
    titlePart1: "Strategic AI ",
    titleHighlight: "Solutions",
    description: "Architecting high-performance, production-ready intelligent systems. We transform complex data landscapes into sovereign neural architectures that drive autonomous growth."
  },
  grid: {
    service1: {
      title: "AI System Development",
      description: "End-to-end engineering of custom Machine Learning models. From data synthesis to cloud-native deployment, we build robust backends that scale with your enterprise demands.",
      tags: ["PYTORCH", "TENSORFLOW", "AWS SAGE_MAKER"],
      cta: "LEARN MORE & BOOK"
    },
    service2: {
      title: "Computer Vision Solutions",
      description: "Advanced visual automation for industrial inspection and security. Implementation of YOLOv8 for real-time object detection and anomaly recognition in complex environments.",
      tags: ["OPENCV", "YOLO_V8", "CUDA"],
      cta: "LEARN MORE & BOOK"
    },
    service3: {
      title: "AI Consulting",
      description: "High-level architecture design and feasibility analysis. We bridge the gap between business objectives and technical implementation, ensuring ROI on AI investment.",
      tags: ["STRATEGY", "ROI_MODELS", "COMPUTATIONAL_DESIGN"],
      cta: "LEARN MORE & BOOK"
    },
    service4: {
      title: "Data Automation",
      description: "Automated data extraction and transformation pipelines. We build intelligent bridges between fragmented data sources to fuel your AI engines with high-fidelity inputs.",
      tags: ["APACHE_AIRFLOW", "SNOWFLAKE", "DOCKER"],
      cta: "LEARN MORE & BOOK"
    }
  },
  process: {
    methodology: "Methodology",
    titlePart1: "The Neural ",
    titleHighlight: "Pipeline",
    step1: {
      number: "01",
      title: "Analysis",
      description: "Deep-dive into existing data infrastructure and performance bottlenecks. We define success metrics and technical constraints before the first line of code."
    },
    step2: {
      number: "02",
      title: "Engineering",
      description: "Iterative development using state-of-the-art architectures. We focus on low-latency inference and high-accuracy output through modular design."
    },
    step3: {
      number: "03",
      title: "Deployment",
      description: "Seamless integration into your production environment with continuous monitoring and automated retraining loops to maintain performance peak."
    }
  },
  cta: {
    titleLine1: "Ready to build",
    titleLine2: "the future?",
    description: "Let's discuss how customized AI can transform your operations. Our team is ready to architect your next competitive advantage.",
    button: "Start a Project"
  }
};

const servicesDataVi = {
  hero: {
    subtitle: "Trí tuệ Nhân tạo Định hướng",
    titlePart1: "Giải pháp AI ",
    titleHighlight: "Chiến lược",
    description: "Thiết kế các hệ thống thông minh hiệu suất cao, sẵn sàng cho môi trường thực tế. Chúng tôi chuyển đổi các luồng dữ liệu phức tạp thành các hệ thống mạng nơ-ron độc lập giúp tăng trưởng tự động."
  },
  grid: {
    service1: {
      title: "Phát triển Hệ thống AI",
      description: "Lập trình từ đầu-đến-cuối các mô hình Học Máy tùy chỉnh. Từ việc tổng hợp dữ liệu đến triển khai trên đám mây, chúng tôi xây dựng các backend mạnh mẽ mở rộng cùng với nhu cầu doanh nghiệp của bạn.",
      tags: ["PYTORCH", "TENSORFLOW", "AWS SAGE_MAKER"],
      cta: "TÌM HIỂU THÊM & ĐẶT LỊCH"
    },
    service2: {
      title: "Giải pháp Thị giác Máy tính",
      description: "Tự động hóa trực quan tiên tiến cho kiểm tra công nghiệp và bảo mật. Triển khai YOLOv8 để phát hiện đối tượng theo thời gian thực và nhận diện bất thường trong các môi trường phức tạp.",
      tags: ["OPENCV", "YOLO_V8", "CUDA"],
      cta: "TÌM HIỂU THÊM & ĐẶT LỊCH"
    },
    service3: {
      title: "Tư vấn AI",
      description: "Phân tích khả thi và thiết kế kiến trúc cấp cao. Chúng tôi là cầu nối giữa mục tiêu kinh doanh và triển khai kỹ thuật, đảm bảo ROI (Lợi tức đầu tư) cho khoản đầu tư AI của bạn.",
      tags: ["STRATEGY", "ROI_MODELS", "COMPUTATIONAL_DESIGN"],
      cta: "TÌM HIỂU THÊM & ĐẶT LỊCH"
    },
    service4: {
      title: "Tự động hóa Dữ liệu",
      description: "Tự động hóa đường ống chuyển đổi và trích xuất dữ liệu. Chúng tôi xây dựng các cầu nối thông minh giữa các nguồn dữ liệu rời rạc để nuôi các động cơ AI của bạn bằng khối lượng dữ liệu chất lượng cao.",
      tags: ["APACHE_AIRFLOW", "SNOWFLAKE", "DOCKER"],
      cta: "TÌM HIỂU THÊM & ĐẶT LỊCH"
    }
  },
  process: {
    methodology: "Phương pháp Thực hiện",
    titlePart1: "Quy trình ",
    titleHighlight: "Neural",
    step1: {
      number: "01",
      title: "Phân tích",
      description: "Đi sâu vào cơ sở hạ tầng dữ liệu hiện tại và các nút thắt hiệu suất. Chúng tôi định nghĩa các số liệu thành công và ràng buộc kỹ thuật trước khi viết dòng code đầu tiên."
    },
    step2: {
      number: "02",
      title: "Kỹ thuật",
      description: "Phát triển lặp lặp bằng những kiến trúc tối tân. Chúng tôi tập trung vào suy luận độ trễ thấp và dự đoán độ chính xác cao bằng các thiết kế mô-đun."
    },
    step3: {
      number: "03",
      title: "Triển khai",
      description: "Tích hợp mượt mà vào môi trường gốc với sự liên tục tối ưu và các luồng huấn luyện tự động, nhằm duy trì hiệu năng cao nhất."
    }
  },
  cta: {
    titleLine1: "Sẵn sàng để xây dựng",
    titleLine2: "tương lai?",
    description: "Hãy thảo luận về cách công nghệ AI tuỳ chỉnh có thể làm thay đổi hoàn toàn hệ thống thực thi của bạn. Nhóm của chúng tôi luôn sẵn sàng cho bước tiến tiếp theo của bạn.",
    button: "Bắt đầu Dự án"
  }
};


for (const lang of ['en', 'vi']) {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.ServicesPage = lang === 'en' ? servicesDataEn : servicesDataVi;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}
