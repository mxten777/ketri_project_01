import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

const DUMMY_CERTS = Array.from({ length: 3 }).map((_, i) => ({
  title: `인증서 샘플 ${i + 1}`,
  issuer: "KETRI",
  description: "이곳에는 인증서 또는 자격에 대한 간단한 설명이 들어갑니다.",
  date: "2025-01-01",
}));

export default function Certificates() {
  return (
    <main>
      {/* First section: top padding only (pt-10 ~ pt-12) */}
      <Section spacing="none" className="pt-10 lg:pt-12">
        <Container>
          <h1 className="text-heading-lg font-semibold">인증서/자격</h1>
          <p className="mt-3 text-body-md text-[var(--color-text-tertiary)]">
            회사에서 보유한 인증서와 자격을 확인할 수 있습니다.
          </p>
        </Container>
      </Section>

      {/* Cards section: standard section spacing (py-12 ~ py-16) */}
      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_CERTS.map((c, idx) => (
              <Card
                key={idx}
                as="article"
                padding="md"
                hover="lift"
                className="h-full flex flex-col"
              >
                <CardHeader>
                  <CardTitle>{c.title}</CardTitle>
                  <CardDescription>{c.issuer}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-body-sm text-[var(--color-text-secondary)]">{c.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <span className="text-xs text-[var(--color-text-tertiary)]">발급일: {c.date}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
