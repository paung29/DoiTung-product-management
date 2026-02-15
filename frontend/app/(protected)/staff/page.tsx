"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
}

function StaffHome() {
  const router = useRouter();
  const language: Lang = "en";

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
    },
    {
      id: "flower",
      titleKey: "flowerCluster",
      image: imgFlowerForm,
    },
    {
      id: "pollination",
      titleKey: "pollinationForm",
      image: imgPollinationForm,
    },
    {
      id: "pod",
      titleKey: "podSetting",
      image: imgPodForm,
    },
    {
      id: "pre-harvest",
      titleKey: "preHarvest",
      image: imgPreharvestForm,
    },
    {
      id: "harvest",
      titleKey: "harvestGrading",
      image: imgHarvestForm,
    },
  ];

  const handleCardClick = (cardId: string) => {
    router.push(`/staff/${cardId}`);
  };

  return (
    <div className="min-h-screen bg-[#f2f1ed] px-6 py-12">
      <div className="max-w-screen-2xl mx-auto">
        {/* Grid - All Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formCards.map((card) => (
            <div
              key={card.id}
              className="group relative w-full cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleCardClick(card.id)}
              role="button"
              tabIndex={0}
              aria-label={getText(card.titleKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(card.id);
                }
              }}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                {/* Image Container */}
                <div className="relative w-full h-64 bg-gradient-to-br from-[#faf3e0] to-[#f0e8d0] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={getText(card.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={card.imageStyle || { objectPosition: "center" }}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                </div>

                {/* Card Footer */}
                <div className="relative px-6 py-5 bg-white">
                  {/* Title */}
                  <h3 className="text-center text-gray-900 font-['Poppins'] font-semibold text-lg leading-snug mb-1 min-h-14 flex items-center justify-center">
                    {getText(card.titleKey)}
                  </h3>

                  {/* Arrow Button */}
                  <div className="absolute bottom-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-[#8a6752] transition-all duration-300 group-hover:bg-opacity-100 shadow-md">
                    <svg
                      className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-0.5"
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

export default StaffHome;
