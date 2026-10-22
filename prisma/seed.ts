import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Idempotency: this script wipes and recreates projects, so it must never
  // run against a database that already holds content (the admin panel may
  // have edited it). SEED_FORCE=1 forces a full reset.
  const force = process.env.SEED_FORCE === '1';
  const existing = await prisma.project.count();

  if (existing > 0 && !force) {
    console.log(
      `Seed skipped: database already has content (${existing} projects). ` +
        'Set SEED_FORCE=1 to reset.'
    );
    return;
  }

  await prisma.metric.deleteMany();
  await prisma.techStack.deleteMany();
  await prisma.projectTranslation.deleteMany();
  await prisma.project.deleteMany();
  await prisma.testimonial.deleteMany();

  const p1 = await prisma.project.create({
    data: {
      slug: 'neural-surveillance-engine',
      title: 'Neural Surveillance Engine',
      description: 'Real-time multi-target detection system achieving 12ms inference latency, deployed across 200+ smart city cameras using custom TensorRT pipelines.',
      category: 'Computer Vision',
      status: 'ACTIVE',
      visibility: 'PUBLIC',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYMH8FKTB0Dw4FpPKzVMhyT4k4T2WIQ-t3YhDA5tZl6HvRgg8YCKSi5QqEeqrWiUNCBF8nWGwGSOu9L4IJm29WJ7cjGn9rT8kuXFCeTU3CwBIkWntw2HoYmNtG_fW6P5Xm6ROR9Xidvwkz_sv_AD7CMygCKsLOhTDJtA9iUA6KuEQq-D_iwVZi6WlNK4tf4kahFB52_T-rpsvWQMNMvnB4FfQJo_ieO97wuUL9xS9uQKE8f_IXLQduByAhqxFfz3XhbeyNYdmm4A9',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      clientName: 'Smart City Initiative',
      timeline: '12 weeks',
      budgetRange: '$100K - $150K',
      challenge: 'Traditional surveillance systems suffered from high latency (>200ms) and significant false alarm rates (35%). In high-security environments, the gap between an incident and its detection could be catastrophic. The client needed a solution that could process multiple 4K video streams simultaneously while maintaining sub-15ms inference time and achieving over 98% precision across diverse lighting conditions.',
      solution: 'We engineered a custom pipeline consisting of:\n- Custom YOLO backbone fine-tuned on domain-specific datasets\n- INT8 quantization using TensorRT for NVIDIA hardware\n- C++ inference server with hardware-accelerated GStreamer pipelines\n- Asynchronous alerting system with WebSocket integration for real-time dashboards\n\nThe system was deployed across 200+ cameras in 3 cities with comprehensive monitoring and automated retraining loops.',
      impact: 'The deployment achieved exceptional results:\n- 12ms end-to-end inference latency (94% reduction)\n- 99.2% detection precision (false alarm rate reduced to <1%)\n- 16 parallel 4K streams per server\n- 40% overall latency reduction in incident response\n- Deployed to 200+ cameras across 3 cities with 99.99% uptime',
      content: '## Overview\n\nA real-time multi-target detection system built for smart city infrastructure. Using custom TensorRT pipelines and NVIDIA hardware, this system achieves 12ms inference latency at 99.2% precision.\n\n## Architecture\n\nThe pipeline consists of a custom YOLO backbone fine-tuned on domain-specific datasets, quantized to INT8 precision using TensorRT, and deployed via a C++ inference server.\n\n## Results\n\n- 12ms end-to-end inference latency\n- 99.2% detection precision\n- Deployed to 200+ cameras across 3 cities',
      techStack: { create: [{ name: 'PyTorch' }, { name: 'OpenCV' }, { name: 'C++' }, { name: 'NVIDIA TensorRT' }, { name: 'Python' }] },
      metrics: { create: [{ key: 'Inference Time', value: '12ms' }, { key: 'Precision', value: '99.2%' }, { key: 'Cameras Deployed', value: '200+' }, { key: 'F1 Score', value: '0.98' }] },
    }
  });
  await prisma.projectTranslation.create({
    data: {
      locale: 'vi',
      projectId: p1.id,
      title: 'Hệ thống Giám sát Neural',
      description: 'Hệ thống phát hiện đa mục tiêu theo thời gian thực đạt độ trễ suy luận 12ms, triển khai trên 200+ camera thành phố thông minh sử dụng pipeline TensorRT tùy chỉnh.',
      content: '## Tổng quan\n\nMột hệ thống phát hiện đa mục tiêu theo thời gian thực được xây dựng cho cơ sở hạ tầng thành phố thông minh. Sử dụng pipeline TensorRT tùy chỉnh và phần cứng NVIDIA, hệ thống đạt độ trễ suy luận 12ms với độ chính xác 99.2%.\n\n## Kiến trúc\n\nPipeline bao gồm backbone YOLO tùy chỉnh được tinh chỉnh trên tập dữ liệu lĩnh vực cụ thể, lượng tử hóa đến độ chính xác INT8 bằng TensorRT, và triển khai thông qua máy chủ suy luận C++.\n\n## Kết quả\n\n- Độ trễ suy luận end-to-end 12ms\n- Độ chính xác phát hiện 99.2%\n- Triển khai cho 200+ camera tại 3 thành phố',
    }
  });

  const p2 = await prisma.project.create({
    data: {
      slug: 'medlm-diagnostic-assistant',
      title: 'MedLM Diagnostic Assistant',
      description: 'Fine-tuned medical LLM achieving 94.3% diagnostic accuracy across 12 specialities. Built on a RAG pipeline ingesting 2.3M clinical notes with HIPAA-compliant infrastructure.',
      category: 'Generative AI',
      status: 'ACTIVE',
      visibility: 'PUBLIC',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQUGtN5f1Iw8EA5QlZ4KNdwSwCS8TIWp1lTZOsp2jGd5ItzPc1EU1W9icq-R_FR5jUw4KpdV3cj7ba5iHeDRAEMcz3G9KFD4iSUaTgvxv7QTDHz9dkw5m9GCdobIEwNUK6pW9yXeYfb54_Kcnrm32NrTq8sI3S-7Lrlce7Q-Gt9L1vHwvQ2IvjYQUZqITO57sjT7VhlMvO_XIOfwwauDHhr1uvYF07mr6J5s7l_0cqHlUcFSmHORVq2GaPcEk9TCaKiXoHaEV5AhgS',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      clientName: 'MediTech AI',
      timeline: '16 weeks',
      budgetRange: '$150K - $200K',
      challenge: 'Healthcare providers struggled with diagnostic consistency across specialties. Junior physicians needed decision support, while experienced doctors wanted quick access to relevant clinical literature. The existing system had poor recall and couldn\'t handle complex multi-symptom cases.',
      solution: 'We built MedLM on LLaMA 3, fine-tuned with QLoRA on 800K labeled clinical cases. The RAG layer uses pgvector for semantic search across 2.3M clinical notes. The system includes:\n- HIPAA-compliant infrastructure with end-to-end encryption\n- Real-time citation tracking for all recommendations\n- Confidence scoring with uncertainty quantification\n- Integration with existing EHR systems',
      impact: 'Results exceeded all expectations:\n- 94.3% diagnostic accuracy across 12 specialties\n- 340ms average response latency\n- 2.3M clinical notes indexed and searchable\n- 40% reduction in diagnostic errors\n- Adopted by 500+ physicians across 3 hospital networks',
      content: '## Overview\n\nA medical diagnostic assistant powered by a fine-tuned LLM, built on a Retrieval-Augmented Generation (RAG) pipeline that indexes 2.3 million clinical notes.\n\n## Architecture\n\nThe core model is built on LLaMA 3, fine-tuned with QLoRA on 800K labeled clinical cases. The RAG layer uses pgvector for semantic search across the clinical note corpus.\n\n## Results\n\n- 94.3% diagnostic accuracy\n- 2.3M clinical notes indexed\n- Covers 12 medical specialties',
      techStack: { create: [{ name: 'LangChain' }, { name: 'HuggingFace' }, { name: 'FastAPI' }, { name: 'PostgreSQL' }, { name: 'LLaMA 3' }] },
      metrics: { create: [{ key: 'F1 Score', value: '0.943' }, { key: 'Latency', value: '340ms' }, { key: 'Clinical Notes', value: '2.3M' }, { key: 'Specialties', value: '12' }] },
    }
  });
  await prisma.projectTranslation.create({
    data: {
      locale: 'vi',
      projectId: p2.id,
      title: 'Trợ lý Chẩn đoán MedLM',
      description: 'LLM y tế được tinh chỉnh đạt độ chính xác chẩn đoán 94.3% trên 12 chuyên khoa. Xây dựng trên pipeline RAG xử lý 2.3 triệu hồ sơ lâm sàng với cơ sở hạ tầng tuân thủ HIPAA.',
      content: '## Tổng quan\n\nMột trợ lý chẩn đoán y tế được cung cấp bởi LLM tinh chỉnh, xây dựng trên pipeline Retrieval-Augmented Generation (RAG) lập chỉ mục 2.3 triệu hồ sơ lâm sàng.\n\n## Kiến trúc\n\nMô hình cốt lõi được xây dựng trên LLaMA 3, tinh chỉnh với QLoRA trên 800K trường hợp lâm sàng được gán nhãn. Lớp RAG sử dụng pgvector để tìm kiếm ngữ nghĩa trên kho hồ sơ lâm sàng.\n\n## Kết quả\n\n- Độ chính xác chẩn đoán 94.3%\n- 2.3 triệu hồ sơ lâm sàng được lập chỉ mục\n- Bao gồm 12 chuyên khoa y tế',
    }
  });

  const p3 = await prisma.project.create({
    data: {
      slug: 'neurolink-data-fabric',
      title: 'NeuroLink Data Fabric',
      description: 'Distributed AI data platform processing 2M events/sec with sub-millisecond latency. Enables real-time feature engineering and model serving at planetary scale.',
      category: 'Machine Learning',
      status: 'ACTIVE',
      visibility: 'PUBLIC',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWGj816ig1kOYOdmLZvnFk7qnAjjcwrBB1JYyH7KS2ebi3x70txeLdVt-FDt5Dffm3qUwZtpaafZHytzuukJUsqygLjdUi6nxHXKw58l0xCEfGFspGzms0UJEhg7A6t1iV-JCSxUHSoZsxzP45SegB_VRYwKba4iTKI2e22rg7-0QiOR54EwN2zvkuj93g4q62flo_x21_rWfxq3_Nzv0fMUzbDwia_v6iwHczjI4mTyxqWgN01eWXFO5GZiV-UhuH91Cz57QKvkcS',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      clientName: 'DataFlow Systems',
      timeline: '20 weeks',
      budgetRange: '$200K - $300K',
      challenge: 'The client\'s existing data infrastructure couldn\'t support real-time ML inference at scale. Batch processing introduced 15-minute delays, making fraud detection and personalization impossible. They needed a platform that could handle 2M+ events per second with sub-millisecond feature read latency.',
      solution: 'We built a distributed data fabric on:\n- Apache Kafka for stream ingestion with custom partitioning\n- Apache Spark for distributed feature computation\n- Redis-backed feature store for ultra-low latency reads\n- Kubernetes deployment across 3 cloud regions with automatic failover\n\nThe platform includes automated data versioning, feature lineage tracking, and real-time monitoring dashboards.',
      impact: 'The transformation was dramatic:\n- 2M events/sec throughput sustained\n- 99.99% uptime across 12 months\n- Sub-1ms feature read latency (99.9th percentile)\n- 15-minute batch delay eliminated entirely\n- Supporting 15+ internal ML teams\n- $2.5M annual infrastructure cost savings',
      content: '## Overview\n\nA distributed AI data platform that ingests 2 million events per second with sub-millisecond latency, enabling real-time feature engineering and online model serving.\n\n## Architecture\n\nBuilt on Apache Kafka for stream ingestion, Apache Spark for distributed processing, and a custom feature store backed by Redis for ultra-low latency reads. Deployed on Kubernetes across 3 cloud regions.\n\n## Results\n\n- 2M events/sec throughput\n- 99.99% uptime across 12 months\n- Sub-1ms feature read latency',
      techStack: { create: [{ name: 'Apache Kafka' }, { name: 'Apache Spark' }, { name: 'Kubernetes' }, { name: 'AWS' }, { name: 'Redis' }] },
      metrics: { create: [{ key: 'Throughput', value: '2M/sec' }, { key: 'Uptime', value: '99.99%' }, { key: 'Latency', value: '<1ms' }, { key: 'Cloud Regions', value: '3' }] },
    }
  });
  await prisma.projectTranslation.create({
    data: {
      locale: 'vi',
      projectId: p3.id,
      title: 'NeuroLink Data Fabric',
      description: 'Nền tảng dữ liệu AI phân tán xử lý 2 triệu sự kiện/giây với độ trễ dưới mili-giây. Cho phép kỹ thuật đặc trưng theo thời gian thực và phục vụ mô hình ở quy mô toàn cầu.',
      content: '## Tổng quan\n\nMột nền tảng dữ liệu AI phân tán xử lý 2 triệu sự kiện mỗi giây với độ trễ dưới mili-giây, cho phép kỹ thuật đặc trưng theo thời gian thực và phục vụ mô hình trực tuyến.\n\n## Kiến trúc\n\nXây dựng trên Apache Kafka để tiếp nhận luồng dữ liệu, Apache Spark để xử lý phân tán, và kho đặc trưng tùy chỉnh được hỗ trợ bởi Redis để đọc với độ trễ cực thấp. Triển khai trên Kubernetes tại 3 khu vực đám mây.\n\n## Kết quả\n\n- Thông lượng 2 triệu sự kiện/giây\n- Thời gian hoạt động 99.99% trong 12 tháng\n- Độ trễ đọc đặc trưng dưới 1ms',
    }
  });

  // Seed testimonials
  await prisma.testimonial.create({
    data: {
      name: 'Dr. Sarah Chen',
      role: 'CTO',
      company: 'MediTech AI',
      content: 'The neural surveillance system transformed our security operations. The 12ms latency and 99.2% precision exceeded all expectations. Deployment was seamless and the team provided exceptional support throughout.',
      featured: true,
      order: 0,
    }
  });

  await prisma.testimonial.create({
    data: {
      name: 'James Morrison',
      role: 'VP of Engineering',
      company: 'DataFlow Systems',
      content: 'Working with this team on our distributed data platform was a game-changer. They delivered a system handling 2M events/sec with sub-millisecond latency. Their expertise in Kafka and Spark is unmatched.',
      featured: true,
      order: 1,
    }
  });

  await prisma.testimonial.create({
    data: {
      name: 'Dr. Emily Rodriguez',
      role: 'Director of AI Research',
      company: 'HealthFirst',
      content: 'The MedLM diagnostic assistant has been integrated into our clinical workflow with remarkable results. 94.3% diagnostic accuracy across 12 specialties - this is the future of healthcare AI.',
      featured: true,
      order: 2,
    }
  });

  console.log('✅ Seeded 3 projects with English + Vietnamese translations.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
