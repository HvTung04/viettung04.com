/**
 * Seeds the public-facing content that the admin panel manages.
 * Safe to re-run: every model is cleared and recreated.
 *
 *   npm run db:seed:content
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SERVICES = [
  {
    title: 'AI System Development',
    description:
      'End-to-end delivery of custom ML systems: data pipeline, model training, evaluation, and deployment into your existing infrastructure.',
    category: 'AI System Dev',
    tags: 'PyTorch,MLOps,Kubernetes',
    viTitle: 'Phát triển Hệ thống AI',
    viDescription:
      'Triển khai trọn gói hệ thống ML tùy chỉnh: pipeline dữ liệu, huấn luyện mô hình, đánh giá và tích hợp vào hạ tầng sẵn có của bạn.',
  },
  {
    title: 'Computer Vision',
    description:
      'Real-time object detection, segmentation and defect inspection for industrial and security environments, optimised for edge hardware.',
    category: 'Computer Vision',
    tags: 'YOLOv8,TensorRT,OpenCV',
    viTitle: 'Thị giác Máy tính',
    viDescription:
      'Phát hiện vật thể, phân đoạn và kiểm tra khuyết tật theo thời gian thực cho môi trường công nghiệp và an ninh, tối ưu cho thiết bị edge.',
  },
  {
    title: 'LLM Applications',
    description:
      'Production RAG and agentic systems with retrieval, tool use, evaluation harnesses and guardrails that hold up under real traffic.',
    category: 'Generative AI',
    tags: 'RAG,LangChain,Evaluation',
    viTitle: 'Ứng dụng LLM',
    viDescription:
      'Hệ thống RAG và agent ở mức production với retrieval, tool use, bộ đánh giá và guardrail chịu được tải thật.',
  },
  {
    title: 'Data & ML Platform',
    description:
      'Feature stores, streaming ingestion and orchestration that let 15+ teams train on the same governed, versioned data.',
    category: 'Data Engineering',
    tags: 'Kafka,Snowflake,Airflow',
    viTitle: 'Nền tảng Dữ liệu & ML',
    viDescription:
      'Feature store, streaming ingestion và orchestration giúp hơn 15 nhóm huấn luyện trên cùng dữ liệu có governance và versioning.',
  },
];

const METRICS = [
  { label: 'Years Experience', value: '10', suffix: '+', description: 'Shipping production ML systems' },
  { label: 'Models Deployed', value: '60', suffix: '+', description: 'Across CV, NLP and generative AI' },
  { label: 'Avg. Latency', value: '12', suffix: 'ms', description: 'Edge inference at 4K resolution' },
  { label: 'Clients Served', value: '24', suffix: '', description: 'Startups to enterprise' },
];

const CLIENTS = [
  { name: 'MediTech AI', websiteUrl: 'https://example.com' },
  { name: 'DataFlow Systems', websiteUrl: 'https://example.com' },
  { name: 'Smart City Initiative', websiteUrl: 'https://example.com' },
  { name: 'HealthFirst', websiteUrl: 'https://example.com' },
  { name: 'AI Vision Labs', websiteUrl: 'https://example.com' },
  { name: 'TechCorp Global', websiteUrl: 'https://example.com' },
];

const TECHNOLOGIES = [
  { name: 'PyTorch', category: 'ML Frameworks', description: 'Primary training and inference framework.' },
  { name: 'TensorFlow', category: 'ML Frameworks', description: 'Production serving and TFX pipelines.' },
  { name: 'Hugging Face', category: 'ML Frameworks', description: 'Transformers, tokenizers and model hub.' },
  { name: 'LangChain', category: 'LLM Tooling', description: 'RAG pipelines and agent orchestration.' },
  { name: 'NVIDIA TensorRT', category: 'Inference', description: 'INT8/FP16 optimisation for edge GPUs.' },
  { name: 'OpenCV', category: 'Computer Vision', description: 'Image and video processing pipelines.' },
  { name: 'Apache Kafka', category: 'Data Engineering', description: 'Event streaming for feature pipelines.' },
  { name: 'Apache Spark', category: 'Data Engineering', description: 'Distributed training and batch ETL.' },
  { name: 'Snowflake', category: 'Data Engineering', description: 'Governed warehouse and feature serving.' },
  { name: 'Docker', category: 'DevOps', description: 'Reproducible build and runtime images.' },
  { name: 'Kubernetes', category: 'DevOps', description: 'Autoscaling inference and training jobs.' },
  { name: 'AWS SageMaker', category: 'DevOps', description: 'Managed training and endpoint hosting.' },
  { name: 'Python', category: 'Languages', description: 'Primary language for modelling and services.' },
  { name: 'C++', category: 'Languages', description: 'Latency-critical inference servers.' },
  { name: 'Rust', category: 'Languages', description: 'High-throughput data tooling.' },
  { name: 'SQL', category: 'Languages', description: 'Analytical and feature-store queries.' },
];

const FAQS = [
  {
    locale: 'en',
    question: 'How do you start an AI project?',
    answer:
      'With a data and feasibility review. We audit the data you already have, agree on the decision the model has to improve, and define the metric before a single line of model code is written.',
  },
  {
    locale: 'en',
    question: 'Do you work with existing teams?',
    answer:
      'Yes. Most engagements embed alongside your engineers: I write production code, write the docs, and leave the system maintainable by the team that inherits it.',
  },
  {
    locale: 'en',
    question: 'What does a production deployment include?',
    answer:
      'Containerised inference, automated evaluation on every build, observability, a rollback path and the runbook for on-call. A demo is not a deliverable.',
  },
  {
    locale: 'en',
    question: 'How long does a typical engagement take?',
    answer:
      'Eight to sixteen weeks for a first production system. Longer for multi-team platforms. The first milestone is always a working end-to-end path, not a slide.',
  },
  {
    locale: 'en',
    question: 'Do you work remotely?',
    answer:
      'Yes — I work remotely with clients in Vietnam, Singapore and Europe, and travel on-site for launch and handover weeks.',
  },
  {
    locale: 'en',
    question: 'What does it cost?',
    answer:
      'Most projects are fixed scope and fixed price once the first milestone is agreed. Retainers are available for ongoing model improvement and platform work.',
  },
  {
    locale: 'vi',
    question: 'Dự án AI của tôi nên bắt đầu như thế nào?',
    answer:
      'Bằng một đợt rà soát dữ liệu và tính khả thi. Tôi kiểm tra dữ liệu bạn đang có, thống nhất quyết định mà mô hình cần cải thiện và chốt số liệu đo trước khi viết dòng code mô hình đầu tiên.',
  },
  {
    locale: 'vi',
    question: 'Bạn có làm việc cùng đội ngũ hiện có của tôi không?',
    answer:
      'Có. Phần lớn dự án tôi làm việc song song với đội kỹ sư của bạn: tôi viết code production, viết tài liệu và để lại hệ thống có thể bảo trì bởi đội tiếp nhận.',
  },
  {
    locale: 'vi',
    question: 'Bàn giao production gồm những gì?',
    answer:
      'Inference đóng gói container, đánh giá tự động mỗi lần build, observability, đường rollback và runbook cho on-call. Demo không phải là sản phẩm bàn giao.',
  },
  {
    locale: 'vi',
    question: 'Một dự án thường kéo dài bao lâu?',
    answer:
      'Tám đến mười sáu tuần cho hệ thống production đầu tiên, lâu hơn với nền tảng phục vụ nhiều đội. Mốc đầu tiên luôn là một luồng chạy end-to-end, không phải một slide.',
  },
  {
    locale: 'vi',
    question: 'Bạn có làm việc từ xa không?',
    answer:
      'Có. Tôi làm việc từ xa với khách hàng tại Việt Nam, Singapore và châu Âu, và đi công tác tại chỗ trong tuần ra mắt và bàn giao.',
  },
  {
    locale: 'vi',
    question: 'Chi phí như thế nào?',
    answer:
      'Đa số dự án được chốt phạm vi và giá cố định sau khi thống nhất mốc đầu tiên. Tôi cũng nhận retainer cho các giai đoạn cải tiến mô hình và phát triển nền tảng.',
  },
];

const BLOGS = [
  {
    slug: 'shipping-llm-features-production',
    category: 'LLM_OPS',
    title: 'Shipping LLM features to production without a demo-to-production gap',
    description:
      'Evaluation harnesses, retrieval quality, guardrails and the failure modes that only show up under real traffic.',
    content: `## The demo is not the product

A prompt that works in a notebook tells you almost nothing about production behaviour. Real users write inputs that are longer, lazier, more multilingual and more adversarial than your test set.

## Start with an evaluation set

Before touching the model, I build a golden dataset of real requests and the answers a human would accept. Everything after that - prompt edits, retrieval changes, model swaps - is measured against it. Without this, every change is a guess dressed up as an A/B test.

## Retrieval quality dominates

For most knowledge questions, the retriever decides the answer long before the model does. Chunking, hybrid search, reranking and query expansion consistently produce larger gains than switching to a bigger model.

## Guardrails belong in the request path

Input filtering, output validation and a hard timeout should be normal request handling, not an afterthought. The system must be able to fail safely.

## Observability is the product

Log the retrieved context, the prompt, the latency and the outcome of every evaluation. Without that, you cannot explain a regression, and you cannot price the next improvement.

## What I actually ship

- A golden evaluation set that lives in the repository
- CI that runs the set on every prompt or model change
- A retrieval layer with measurable recall
- Structured logs for every request
- A rollback switch`,
    viTitle: 'Đưa tính năng LLM lên production mà không bỏ ngỡ giữa demo và sản phẩm',
    viDescription:
      'Bộ đánh giá, chất lượng retrieval, guardrail và những lỗi chỉ xuất hiện khi chịu tải thật.',
    viContent: `## Demo không phải là sản phẩm

Một prompt chạy được trong notebook gần như không nói lên điều gì về hành vi production. Người dùng thật viết input dài hơn, cẩu thả hơn, đa ngôn ngữ hơn và đối kháng hơn bộ test của bạn rất nhiều.

## Bắt đầu bằng bộ đánh giá

Trước khi đụng vào mô hình, tôi xây một tập dữ liệu vàng gồm các request thật và câu trả lời mà con người chấp nhận được. Mọi thay đổi sau đó - sửa prompt, đổi retrieval, đổi model - đều được đo trên đó.

## Chất lượng retrieval quyết định phần lớn kết quả

Với câu hỏi kiến thức, retriever quyết định câu trả lời trước khi mô hình kịp nghĩ. Chunking, hybrid search, reranking và query expansion cho lợi ích lớn hơn hẳn việc đổi sang model lớn hơn.

## Guardrail phải nằm trong đường xử lý request

Lọc input, kiểm tra output và timeout cứng là xử lý request bình thường. Hệ thống phải biết fail an toàn.

## Observability chính là sản phẩm

Ghi lại context đã truy xuất, prompt, độ trễ và kết quả đánh giá cho mọi request. Không có nó, bạn không giải thích được một regression.

## Tôi thực sự bàn giao

- Tập dữ liệu vàng nằm trong repository
- CI chạy tập đánh giá mỗi khi đổi prompt hoặc model
- Tầng retrieval với recall đo được
- Log có cấu trúc cho mọi request
- Công tắc rollback`,
  },
  {
    slug: 'computer-vision-edge-deployment',
    category: 'CV',
    title: 'Computer vision on the edge: making 4K streams cheap enough to run',
    description:
      'Quantisation, batching, and the engineering decisions that turn an expensive GPU rack into a handful of small boxes.',
    content: `## Why edge

Streaming 4K video to a central GPU is expensive and fragile. Moving inference to the edge cuts bandwidth, latency and the blast radius of a network failure.

## Quantise, then measure

INT8 usually halves memory and doubles throughput on TensorRT-compatible hardware, with a small accuracy cost. The small cost is only acceptable if you measure it on your own data, not on a public benchmark.

## Batching is the hidden lever

Nobody gets a free lunch from batching: it trades latency for throughput. Tune the batch window against your actual frame arrival rate rather than a round number.

## Fail gracefully, not silently

A camera that drops frames should be visible in your metrics. Silent degradation is how an inference system quietly stops working.

## The checklist

- Profile the decode path, not just the model
- Quantise per layer and re-evaluate accuracy
- Set the batch window from measured arrival rates
- Expose dropped-frame and thermal metrics
- Keep a CPU fallback path for degraded mode`,
    viTitle: 'Computer vision trên edge: làm cho luồng 4K chạy đủ rẻ',
    viDescription:
      'Lượng tử, batching và những quyết định kỹ thuật biến một dàn GPU đắt tiền thành vài chiếc hộp nhỏ.',
    viContent: `## Vì sao chọn edge

Truyền video 4K về GPU trung tâm tốn kém và dễ vỡ. Đưa inference xuống edge cắt băng thông, giảm độ trễ và giới hạn thiệt hại khi mạng lỗi.

## Lượng tử, rồi mới đo

INT8 thường giảm một nửa bộ nhớ và tăng gấp đôi throughput trên phần cứng tương thích TensorRT, đổi lại mất một ít độ chính xác. Mức mất đó chỉ chấp nhận được nếu bạn đo trên dữ liệu của chính mình.

## Batching là đòn bẩy ẩn

Không ai được lợi miễn phí từ batching: nó đánh đổi độ trễ lấy throughput. Hãy chỉnh cửa sổ batch theo tần suất frame thực tế.

## Hỏng một cách an toàn

Camera rớt frame phải hiện rõ trong metric. Suy giảm âm thầm là cách hệ thống inference ngừng hoạt động mà không ai biết.

## Checklist

- Profile đường decode, không chỉ model
- Lượng tử theo từng layer và đo lại độ chính xác
- Đặt cửa sổ batch theo tần suất thực tế
- Expose metric dropped-frame và nhiệt độ
- Giữ đường dẫn CPU fallback cho degraded mode`,
  },
  {
    slug: 'feature-stores-data-versioning',
    category: 'SCALE',
    title: 'Feature stores and data versioning: stopping training/serving skew',
    description:
      'Point-in-time correctness, offline/online parity, and the lineage you need when a model silently degrades.',
    content: `## Training/serving skew

The most expensive bugs are the ones where training and serving compute different features. They do not fail loudly; they just make the model worse over time.

## Point-in-time correctness

A training set built with a join that ignores event time leaks future information into the past. Feature definitions must be evaluated as of the label timestamp, not the extraction timestamp.

## Offline/online parity

The same logical feature must be computed by the same code in training and serving. Shared transformation code plus a parity test on a sample of records is the cheapest insurance available.

## Version everything

Data, transformation code, model weights and the serving config all need versions, and every prediction needs to record which versions produced it. Without that, a regression is archaeology.

## What to track

- Feature freshness and null rates
- Offline/online parity deltas
- Distribution drift per feature
- Lineage from prediction back to source rows`,
    viTitle: 'Feature store và versioning dữ liệu: chấm dứt training/serving skew',
    viDescription:
      'Tính đúng theo thời điểm, parity giữa offline và online, và lineage bạn cần khi mô hình suy giảm âm thầm.',
    viContent: `## Training/serving skew

Những lỗi đắt nhất là loại tính feature khác nhau giữa lúc train và lúc serve. Chúng không hỏng to, chỉ khiến mô hình tệ dần theo thời gian.

## Tính đúng theo thời điểm

Tập train dựng bằng join bỏ qua event time sẽ rò rỉ thông tin tương lai vào quá khứ. Feature phải được tính tại thời điểm của label, không phải thời điểm trích xuất.

## Parity offline/online

Cùng một feature logic phải được tính bởi cùng đoạn code ở cả hai nơi. Code dùng chung cộng một bài test parity trên mẫu bản ghi là cách bảo hiểm rẻ nhất.

## Version mọi thứ

Dữ liệu, code biến đổi, trọng số mô hình và config serving đều cần version, và mỗi prediction phải ghi lại version đã sinh ra nó.

## Cần theo dõi

- Độ tươi mới và tỉ lệ null của feature
- Chênh lệch parity offline/online
- Drift phân phối theo từ�ng feature
- Lineage từ prediction về tới dòng dữ liệu gốc`,
  },
];

async function main() {
  // --- services ---
  await prisma.serviceTranslation.deleteMany();
  await prisma.service.deleteMany();
  for (const [index, service] of SERVICES.entries()) {
    const created = await prisma.service.create({
      data: {
        title: service.title,
        description: service.description,
        category: service.category,
        tags: service.tags,
        order: index,
        status: 'ACTIVE',
      },
    });
    await prisma.serviceTranslation.create({
      data: {
        serviceId: created.id,
        locale: 'vi',
        title: service.viTitle,
        description: service.viDescription,
      },
    });
  }

  // --- metrics ---
  await prisma.siteMetric.deleteMany();
  for (const [index, metric] of METRICS.entries()) {
    await prisma.siteMetric.create({
      data: { ...metric, order: index, status: 'ACTIVE' },
    });
  }

  // --- clients ---
  await prisma.client.deleteMany();
  for (const [index, client] of CLIENTS.entries()) {
    await prisma.client.create({
      data: { ...client, order: index, status: 'ACTIVE' },
    });
  }

  // --- technologies ---
  await prisma.technologyTranslation.deleteMany();
  await prisma.technology.deleteMany();
  for (const [index, tech] of TECHNOLOGIES.entries()) {
    const created = await prisma.technology.create({
      data: {
        name: tech.name,
        category: tech.category,
        description: tech.description,
        order: index,
        status: 'ACTIVE',
      },
    });
    await prisma.technologyTranslation.create({
      data: {
        technologyId: created.id,
        locale: 'vi',
        name: tech.name,
        description: tech.description,
      },
    });
  }

  // --- faq ---
  await prisma.faq.deleteMany();
  for (const [index, faq] of FAQS.entries()) {
    await prisma.faq.create({
      data: { ...faq, order: index, status: 'ACTIVE' },
    });
  }

  // --- blogs ---
  await prisma.blogTranslation.deleteMany();
  await prisma.blog.deleteMany();
  for (const post of BLOGS) {
    const created = await prisma.blog.create({
      data: {
        slug: post.slug,
        category: post.category,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        views: 0,
      },
    });
    await prisma.blogTranslation.create({
      data: {
        blogId: created.id,
        locale: 'en',
        title: post.title,
        description: post.description,
        content: post.content,
      },
    });
    await prisma.blogTranslation.create({
      data: {
        blogId: created.id,
        locale: 'vi',
        title: post.viTitle,
        description: post.viDescription,
        content: post.viContent,
      },
    });
  }

  console.log(
    `Seeded: ${SERVICES.length} services, ${METRICS.length} metrics, ${CLIENTS.length} clients, ` +
      `${TECHNOLOGIES.length} technologies, ${FAQS.length} faqs, ${BLOGS.length} blog posts.`
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
