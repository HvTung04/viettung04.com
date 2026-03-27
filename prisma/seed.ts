import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data first
  await prisma.metric.deleteMany();
  await prisma.techStack.deleteMany();
  await prisma.project.deleteMany();

  await prisma.project.create({
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
      content: '## Overview\n\nA real-time multi-target detection system built for smart city infrastructure. Using custom TensorRT pipelines and NVIDIA hardware, this system achieves 12ms inference latency at 99.2% precision.\n\n## Architecture\n\nThe pipeline consists of a custom YOLO backbone fine-tuned on domain-specific datasets, quantized to INT8 precision using TensorRT, and deployed via a C++ inference server.\n\n## Results\n\n- 12ms end-to-end inference latency\n- 99.2% detection precision\n- Deployed to 200+ cameras across 3 cities',
      techStack: {
        create: [
          { name: 'PyTorch' },
          { name: 'OpenCV' },
          { name: 'C++' },
          { name: 'NVIDIA TensorRT' },
          { name: 'Python' },
        ]
      },
      metrics: {
        create: [
          { key: 'Inference Time', value: '12ms' },
          { key: 'Precision', value: '99.2%' },
          { key: 'Cameras Deployed', value: '200+' },
          { key: 'F1 Score', value: '0.98' },
        ]
      }
    }
  });

  await prisma.project.create({
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
      content: '## Overview\n\nA medical diagnostic assistant powered by a fine-tuned LLM, built on a Retrieval-Augmented Generation (RAG) pipeline that indexes 2.3 million clinical notes.\n\n## Architecture\n\nThe core model is built on LLaMA 3, fine-tuned with QLoRA on 800K labeled clinical cases. The RAG layer uses pgvector for semantic search across the clinical note corpus.\n\n## Results\n\n- 94.3% diagnostic accuracy\n- 2.3M clinical notes indexed\n- Covers 12 medical specialties',
      techStack: {
        create: [
          { name: 'LangChain' },
          { name: 'HuggingFace' },
          { name: 'FastAPI' },
          { name: 'PostgreSQL' },
          { name: 'LLaMA 3' },
        ]
      },
      metrics: {
        create: [
          { key: 'F1 Score', value: '0.943' },
          { key: 'Latency', value: '340ms' },
          { key: 'Clinical Notes', value: '2.3M' },
          { key: 'Specialties', value: '12' },
        ]
      }
    }
  });

  await prisma.project.create({
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
      content: '## Overview\n\nA distributed AI data platform that ingests 2 million events per second with sub-millisecond latency, enabling real-time feature engineering and online model serving.\n\n## Architecture\n\nBuilt on Apache Kafka for stream ingestion, Apache Spark for distributed processing, and a custom feature store backed by Redis for ultra-low latency reads. Deployed on Kubernetes across 3 cloud regions.\n\n## Results\n\n- 2M events/sec throughput\n- 99.99% uptime across 12 months\n- Sub-1ms feature read latency',
      techStack: {
        create: [
          { name: 'Apache Kafka' },
          { name: 'Apache Spark' },
          { name: 'Kubernetes' },
          { name: 'AWS' },
          { name: 'Redis' },
        ]
      },
      metrics: {
        create: [
          { key: 'Throughput', value: '2M/sec' },
          { key: 'Uptime', value: '99.99%' },
          { key: 'Latency', value: '<1ms' },
          { key: 'Cloud Regions', value: '3' },
        ]
      }
    }
  });

  console.log('✅ Seeded 3 mock projects successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
