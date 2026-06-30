'use client';

import Img from 'next/image';

export default function ReviewsTeaser() {
    return (
        <div className="bg-surface-container-low p-6 rounded-3xl flex items-center justify-between">
            <div className="flex -space-x-3">
            <Img
                width={400}
                height={400}
                className="w-8 h-8 rounded-full border-2 border-surface"
                alt="close up headshot of a smiling man"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSJfqkSwK5GuzjPMxwce2iOPyrObrnnFDww82Vytw_2z78RyI6xQURhwB2hOp2H4-HlRufFhc1v2-wty9G7TzVcbv3TldUAnVPhPOKRKdi5jpIf4tINudZGwbd_f4W08AqZt2OEHHiE3B-uhmaac0TUN1k4I2Rr789NRacSORH-Hj3WfOjEgiay2NX5ApQZIH07LlRFDBouGleRlwudJ9VpyJ2J-WlLYBCEKlVIVjAF0cwfqZWB0HxxSxmVum64lu4xwkLeggQsxM"
            />
            <Img
                width={400}
                height={400}
                className="w-8 h-8 rounded-full border-2 border-surface"
                alt="close up headshot of a professional woman"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9RhaoKRAPAcJRI_2ffM--VF2ih9NarOCTiDiW6hCRCV_1HvC8qiX9OLaGStFwsaFjQ_nBnLbRgLLbin5RSbgfDgHwTOiwnsjDJu8o8zIVOAAtu8iRNQGFtj_UxNudWIKyHvNBFAS5bQYyOWB6OnYL-BWEDvvJxG1M3DxP2iXuP_9xxgLSSv3yTYdoEtNqlPGJLV3UqOxeeBgPjTKsCzVazDf_q2dKXRrIPCmthUTKTztiyppjxDzJPXzl7jdcxRVi9OJlPXAJICM"
            />
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold">
                +1k
            </div>
            </div>
            <div className="text-right">
            <div className="text-sm font-bold">Trusted by many</div>
            <button className="text-xs text-primary font-medium underline decoration-primary/30">
                Read all reviews
            </button>
            </div>
        </div>
    );
}