<!-- <script setup>
import { motion } from "motion-v";
</script>

<template>
  <motion.div
    class="box"
    :animate="{ rotate: 360 }"
    :transition="{ duration: 1 }"
  />
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: #0cdcf7;
  border-radius: 5px;
}
</style> -->

<script setup>
import { motion, useScroll, useTransform } from "motion-v";
import { ref } from "vue";
const containerRef = ref(null);
const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
});
// Map scroll progress [0, 1] to degrees [0, 360]
const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
</script>
<!-- width="996" height="606" -->
<template>
    <div :ref="containerRef" class="w-full h-full">
        <motion.svg viewBox="0 0 996 606" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_153_3)">
                <circle cx="617.5" cy="302.5" r="169.5" fill="url(#paint0_radial_153_3)" />
            </g>
            <!-- center image -->
            <g>
                <circle cx="498" cy="303" r="217" fill="#F5F5F5" />
                <path
                    d="M451.273 296.436C451.273 299.067 451.557 301.2 452.055 302.765C452.624 304.329 453.335 306.036 454.33 307.885C454.686 308.454 454.828 309.022 454.828 309.52C454.828 310.231 454.402 310.942 453.477 311.654L448.997 314.64C448.357 315.067 447.717 315.28 447.148 315.28C446.437 315.28 445.726 314.925 445.015 314.285C444.019 313.218 443.166 312.08 442.455 310.942C441.744 309.734 441.033 308.382 440.25 306.747C434.704 313.289 427.735 316.56 419.344 316.56C413.37 316.56 408.606 314.854 405.121 311.44C401.637 308.027 399.859 303.476 399.859 297.787C399.859 291.742 401.992 286.836 406.33 283.138C410.668 279.44 416.428 277.591 423.753 277.591C426.17 277.591 428.659 277.805 431.29 278.16C433.921 278.516 436.624 279.085 439.468 279.725V274.533C439.468 269.129 438.33 265.36 436.126 263.156C433.85 260.951 430.01 259.884 424.535 259.884C422.046 259.884 419.486 260.169 416.855 260.809C414.224 261.449 411.664 262.231 409.175 263.227C408.037 263.724 407.184 264.009 406.686 264.151C406.188 264.293 405.832 264.365 405.548 264.365C404.552 264.365 404.055 263.653 404.055 262.16V258.676C404.055 257.538 404.197 256.684 404.552 256.187C404.908 255.689 405.548 255.191 406.544 254.693C409.033 253.413 412.019 252.347 415.504 251.493C418.988 250.569 422.686 250.142 426.597 250.142C435.059 250.142 441.246 252.062 445.228 255.902C449.139 259.742 451.13 265.573 451.13 273.396V296.436H451.273ZM422.401 307.245C424.748 307.245 427.166 306.818 429.726 305.965C432.286 305.111 434.561 303.547 436.482 301.414C437.619 300.062 438.473 298.569 438.899 296.862C439.326 295.156 439.61 293.094 439.61 290.676V287.689C437.548 287.191 435.344 286.765 433.068 286.48C430.793 286.196 428.588 286.053 426.384 286.053C421.619 286.053 418.135 286.978 415.788 288.898C413.441 290.818 412.304 293.52 412.304 297.076C412.304 300.418 413.157 302.907 414.935 304.614C416.641 306.391 419.13 307.245 422.401 307.245ZM479.504 314.925C478.224 314.925 477.371 314.711 476.802 314.214C476.233 313.787 475.735 312.791 475.308 311.44L458.597 256.471C458.17 255.049 457.957 254.124 457.957 253.627C457.957 252.489 458.526 251.849 459.664 251.849H466.633C467.984 251.849 468.908 252.062 469.406 252.56C469.975 252.987 470.402 253.982 470.828 255.333L482.775 302.409L493.868 255.333C494.224 253.911 494.651 252.987 495.22 252.56C495.788 252.133 496.784 251.849 498.064 251.849H503.753C505.104 251.849 506.028 252.062 506.597 252.56C507.166 252.987 507.664 253.982 507.948 255.333L519.184 302.978L531.486 255.333C531.913 253.911 532.411 252.987 532.909 252.56C533.477 252.133 534.402 251.849 535.682 251.849H542.295C543.433 251.849 544.073 252.418 544.073 253.627C544.073 253.982 544.002 254.338 543.931 254.764C543.86 255.191 543.717 255.76 543.433 256.542L526.295 311.511C525.869 312.934 525.371 313.858 524.802 314.285C524.233 314.711 523.309 314.996 522.1 314.996H515.984C514.633 314.996 513.708 314.782 513.14 314.285C512.571 313.787 512.073 312.862 511.788 311.44L500.766 265.573L489.815 311.369C489.459 312.791 489.033 313.716 488.464 314.214C487.895 314.711 486.899 314.925 485.619 314.925H479.504ZM570.882 316.845C567.184 316.845 563.486 316.418 559.931 315.565C556.375 314.711 553.602 313.787 551.753 312.72C550.615 312.08 549.833 311.369 549.549 310.729C549.264 310.089 549.122 309.378 549.122 308.738V305.111C549.122 303.618 549.691 302.907 550.758 302.907C551.184 302.907 551.611 302.978 552.038 303.12C552.464 303.262 553.104 303.547 553.815 303.831C556.233 304.898 558.864 305.751 561.638 306.32C564.482 306.889 567.255 307.174 570.1 307.174C574.58 307.174 578.064 306.391 580.482 304.827C582.9 303.262 584.18 300.987 584.18 298.071C584.18 296.08 583.54 294.445 582.26 293.094C580.98 291.742 578.562 290.533 575.078 289.396L564.766 286.196C559.575 284.56 555.735 282.142 553.389 278.942C551.042 275.813 549.833 272.329 549.833 268.631C549.833 265.645 550.473 263.013 551.753 260.738C553.033 258.462 554.74 256.471 556.873 254.907C559.006 253.271 561.424 252.062 564.269 251.209C567.113 250.356 570.1 250 573.229 250C574.793 250 576.429 250.071 577.993 250.284C579.629 250.498 581.122 250.782 582.615 251.067C584.038 251.422 585.389 251.778 586.669 252.204C587.949 252.631 588.944 253.058 589.655 253.484C590.651 254.053 591.362 254.622 591.789 255.262C592.215 255.831 592.429 256.613 592.429 257.609V260.951C592.429 262.444 591.86 263.227 590.793 263.227C590.224 263.227 589.3 262.942 588.091 262.373C584.038 260.524 579.487 259.6 574.438 259.6C570.384 259.6 567.184 260.24 564.98 261.591C562.775 262.942 561.638 265.005 561.638 267.92C561.638 269.911 562.349 271.618 563.771 272.969C565.193 274.32 567.824 275.671 571.593 276.88L581.691 280.08C586.811 281.716 590.509 283.991 592.713 286.907C594.918 289.822 595.984 293.165 595.984 296.862C595.984 299.92 595.344 302.694 594.135 305.111C592.855 307.529 591.149 309.662 588.944 311.369C586.74 313.147 584.109 314.427 581.051 315.351C577.851 316.347 574.509 316.845 570.882 316.845Z"
                    fill="#252F3E" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M584.322 351.406C560.926 368.686 526.935 377.86 497.708 377.86C456.748 377.86 419.841 362.713 391.966 337.539C389.761 335.548 391.752 332.846 394.383 334.411C424.535 351.904 461.726 362.5 500.197 362.5C526.153 362.5 554.668 357.095 580.909 346.002C584.82 344.224 588.162 348.562 584.322 351.406Z"
                    fill="#FF9900" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M594.061 340.313C591.074 336.473 574.292 338.464 566.683 339.388C564.407 339.673 564.052 337.682 566.114 336.188C579.483 326.802 601.456 329.504 604.016 332.633C606.576 335.833 603.305 357.806 590.79 368.331C588.87 369.966 587.021 369.113 587.874 366.98C590.719 359.939 597.048 344.082 594.061 340.313Z"
                    fill="#FF9900" />
            </g>
            <!-- end of center image -->
            <motion.g :style="{ rotate: rotate }">
                <!-- outer ring -->
                <g filter="url(#filter1_f_153_3)">
                    <circle cx="498" cy="303" r="277.75" stroke="#F5F5F5" stroke-width="0.5" />
                    <circle cx="498" cy="303" r="277.75" stroke="url(#paint1_linear_153_3)" stroke-width="0.5" />
                </g>
                <!-- outer ring -->
                <g filter="url(#filter2_f_153_3)">
                    <circle cx="498" cy="303" r="343.75" stroke="url(#paint2_linear_153_3)" stroke-width="0.5" id="outerRing" />
                    <circle  cx="776"  cy="303"  r="5" fill="white" />
                     <circle  cx="220"  cy="303"  r="5" fill="white" />
                </g>
                <g filter="url(#filter3_f_153_3)">
                    <circle cx="498" cy="303" r="411.75" stroke="url(#paint3_linear_153_3)" stroke-width="0.5" />
                </g>
                <g filter="url(#filter4_f_153_3)">
                    <circle cx="498" cy="303" r="486.75" stroke="url(#paint4_linear_153_3)" stroke-width="0.5" />
                </g>
            </motion.g>
            <defs>
                <filter id="filter0_f_153_3" x="348" y="33" width="539" height="539" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_153_3" />
                </filter>
                <filter id="filter1_f_153_3" x="219" y="24" width="558" height="558" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_153_3" />
                </filter>
                <filter id="filter2_f_153_3" x="151" y="-44" width="694" height="694" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_153_3" />
                </filter>
                <filter id="filter3_f_153_3" x="79" y="-116" width="838" height="838" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="3.5" result="effect1_foregroundBlur_153_3" />
                </filter>
                <filter id="filter4_f_153_3" x="0" y="-195" width="996" height="996" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur_153_3" />
                </filter>
                <radialGradient id="paint0_radial_153_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(617.5 326.365) rotate(-90) scale(165.217)">
                    <stop offset="0.331731" stop-color="#F45B49" />
                    <stop offset="0.528846" stop-color="#FFB339" />
                    <stop offset="0.966346" stop-color="#F7F7F7" stop-opacity="0.14" />
                </radialGradient>
                <linearGradient id="paint1_linear_153_3" x1="498" y1="25" x2="284.651" y2="499.378"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F5F5F5" />
                    <stop offset="1" stop-color="#7994FF" stop-opacity="0.29" />
                </linearGradient>
                <linearGradient id="paint2_linear_153_3" x1="498" y1="-41" x2="234" y2="546"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F5F5F5" />
                    <stop offset="1" stop-color="#7994FF" stop-opacity="0.29" />
                </linearGradient>
                <linearGradient id="paint3_linear_153_3" x1="498" y1="-109" x2="181.814" y2="594.035"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F5F5F5" />
                    <stop offset="1" stop-color="#7994FF" stop-opacity="0.16" />
                </linearGradient>
                <linearGradient id="paint4_linear_153_3" x1="498" y1="-184" x2="124.256" y2="647.015"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F5F5F5" />
                    <stop offset="1" stop-color="#7994FF" stop-opacity="0.1" />
                </linearGradient>
            </defs>
        </motion.svg>
    </div>
</template>

<style scoped>
/* Optional: Additional styles can be added here */
</style>
