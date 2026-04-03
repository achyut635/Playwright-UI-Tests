import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

export function addAllureLabel(name: string, value: string) {
  allure.label(name, value);
}

export function addAllureFeature(feature: string) {
  allure.label('feature', feature);
}

export function addAllureStory(story: string) {
  allure.label('story', story);
}

export function addAllureSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
  allure.label('severity', severity);
}

export function addAllureOwner(owner: string) {
  allure.label('owner', owner);
}

export function addAllureDescription(description: string) {
  allure.description(description);
}

export async function allureStep<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return allure.step(name, fn);
}

export function addAllureTag(...tags: string[]) {
  tags.forEach(tag => allure.label('tag', tag));
}
