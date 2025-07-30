'use client';

import React from 'react';
import { Bot, ShoppingBag, FileText } from 'lucide-react';
import { FancyTabs, TabConfig } from '@/components/ui/fancy-tabs';

interface TabsNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const agentTabs: TabConfig[] = [
  {
    value: 'marketplace',
    icon: ShoppingBag,
    label: 'Explore',
    shortLabel: 'Explore',
  },
  {
    value: 'my-agents',
    icon: Bot,
    label: 'My Agents',
  },
]; 

export const TabsNavigation = ({ activeTab, onTabChange }: TabsNavigationProps) => {
  const tabs = agentTabs;

  const handleTabSelection = (value: string) => {
    onTabChange(value);
  };

  return (
    <FancyTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabSelection}
    />
);
}