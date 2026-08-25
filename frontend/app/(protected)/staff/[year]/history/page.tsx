"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import CustomButton from "@/components/custom/common/custom-button";
import HomeHistoryTabs from "@/components/custom/staff/home-history-tabs";

import imgClusterForm from "@/public/StaffImage/cluster.svg";
import imgFlowerForm from "@/public/StaffImage/flower.svg";
import imgPollinationForm from "@/public/StaffImage/pollination.svg";
import imgPodForm from "@/public/StaffImage/pod.svg";
import imgPreharvestForm from "@/public/StaffImage/preharvest.svg";
import imgHarvestForm from "@/public/StaffImage/harvest.svg";
import type { StaticImageData } from "next/image";

type Lang = "en" | "th" | "lahu";

interface FormCard {
  id: string;
  titleKey: string;
  image: StaticImageData;
  imageStyle?: React.CSSProperties;
  path: string;
}

function StaffHistory() {
  const router = useRouter();
  const params = useParams();
  const language: Lang = "en";

  const year = params.year as string;

  const getText = (key: string): string => {
    const translations: Record<Lang, Record<string, string>> = {
      en: {
        clusterRecording: "Cluster Form",
        flowerCluster: "Flower Form",
        pollinationForm: "Pollination Form",
        podSetting: "Pod Form",
        preHarvest: "Pre-Harvest Form",
        harvestGrading: "Harvest and Grading",
      },
      th: {
        clusterRecording: "แบบฟอร์มช่อดอก",
        flowerCluster: "แบบฟอร์มดอก",
        pollinationForm: "แบบฟอร์มการผสมเกสร",
        podSetting: "แบบฟอร์มฝัก",
        preHarvest: "แบบฟอร์มก่อนเก็บเกี่ยว",
        harvestGrading: "การเก็บเกี่ยวและคัดแยก",
      },
      lahu: {
        clusterRecording: "Ka• cho te-",
        flowerCluster: "Ka• te-",
        pollinationForm: "Ka• ma- geh",
        podSetting: "Ka• qo te-",
        preHarvest: "Ka• yaw• co te-",
        harvestGrading: "Yaw• co leh- hka-",
      },
    };

    return translations[language]?.[key] ?? key;
  };

  const formCards: FormCard[] = [
    {
      id: "cluster",
      titleKey: "clusterRecording",
      image: imgClusterForm,
      path: `/staff/${year}/history/cluster`,
    },
    {
      id: "flower",
      titleKey: "flowerCluster",
      image: imgFlowerForm,
      path: `/staff/${year}/history/flower`,
    },
    {
      id: "pollination",
      titleKey: "pollinationForm",
      image: imgPollinationForm,
      path: `/staff/${year}/history/pollination`,
    },
    {
      id: "pod",
      titleKey: "podSetting",
      image: imgPodForm,
      path: `/staff/${year}/history/pod`,
    },
    {
      id: "pre-harvest",
      titleKey: "preHarvest",
      image: imgPreharvestForm,
      path: `/staff/${year}/history/pre-harvest`,
    },
    {
      id: "harvest",
      titleKey: "harvestGrading",
      image: imgHarvestForm,
      path: `/staff/${year}/history/harvest-grading`,
    },
  ];

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const handleSelectYearClick = () => {
    router.push("/staff");
  };

  return (
    <div className="min-h-screen bg-[#f2f1ed] px-6 py-12">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <HomeHistoryTabs active="history" />

          <CustomButton
            label={`Current Year - ${year}`}
            onClick={handleSelectYearClick}
          />
        </div>

        {/* Grid - All Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {formCards.map((card) => (
            <div
              key={card.id}
              className="group relative w-full transform cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleCardClick(card.path)}
              role="button"
              tabIndex={0}
              aria-label={getText(card.titleKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(card.path);
                }
              }}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-[#faf3e0] to-[#f0e8d0]">
                  <Image
                    src={card.image}
                    alt={getText(card.titleKey)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={card.imageStyle || { objectPosition: "center" }}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                </div>

                {/* Card Footer */}
                <div className="relative bg-white px-6 py-5">
                  {/* Title */}
                  <h3 className="mb-1 flex min-h-14 items-center justify-center text-center font-['Poppins'] text-lg leading-snug font-semibold text-gray-900">
                    {getText(card.titleKey)}
                  </h3>

                  {/* Arrow Button */}
                  <div className="group-hover:bg-opacity-100 absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#8a6752] shadow-md transition-all duration-300">
                    <svg
                      className="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      {/* right-pointing arrow ( > ). */}
                      <path
                        d="M9 5L16 12L9 19"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StaffHistory;

