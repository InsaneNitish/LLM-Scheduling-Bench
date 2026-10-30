# Benchmark Results Summary

**Note:** All results are from simulated workloads with assumed (uncalibrated) latency parameters.
Values reflect relative policy behavior, not absolute real-world latency.

## E1_load_sweep

| Policy | Variable | Value | TTFT Mean | TTFT p99 | Throughput | E2E Mean | TPOT Mean | Wait Mean |
|--------|----------|-------|-----------|----------|------------|----------|-----------|-----------|
| decode_first | arrival_rate | 0.5 | 160.1213 | 296.8237 | 0.30 | 163.2963 | 0.0250 | 159.9989 |
| decode_first | arrival_rate | 0.5 | 153.7521 | 282.0578 | 0.30 | 156.9271 | 0.0250 | 153.6457 |
| decode_first | arrival_rate | 0.5 | 153.2625 | 292.6154 | 0.30 | 156.4375 | 0.0250 | 153.1421 |
| decode_first | arrival_rate | 1.0 | 259.2845 | 488.3877 | 0.29 | 262.4595 | 0.0250 | 259.1621 |
| decode_first | arrival_rate | 1.0 | 256.4482 | 480.1806 | 0.29 | 259.6232 | 0.0250 | 256.3418 |
| decode_first | arrival_rate | 1.0 | 257.2297 | 487.2080 | 0.29 | 260.4047 | 0.0250 | 257.1094 |
| decode_first | arrival_rate | 2.0 | 310.2570 | 585.5605 | 0.29 | 313.4320 | 0.0250 | 310.1347 |
| decode_first | arrival_rate | 2.0 | 307.7963 | 579.7750 | 0.29 | 310.9713 | 0.0250 | 307.6899 |
| decode_first | arrival_rate | 2.0 | 309.5962 | 584.8872 | 0.29 | 312.7712 | 0.0250 | 309.4759 |
| decode_first | arrival_rate | 4.0 | 335.7433 | 634.1470 | 0.29 | 338.9183 | 0.0250 | 335.6209 |
| decode_first | arrival_rate | 4.0 | 333.4703 | 629.5722 | 0.29 | 336.6453 | 0.0250 | 333.3639 |
| decode_first | arrival_rate | 4.0 | 335.7795 | 633.7268 | 0.29 | 338.9545 | 0.0250 | 335.6591 |
| decode_first | arrival_rate | 8.0 | 348.4864 | 658.4402 | 0.29 | 351.6614 | 0.0250 | 348.3640 |
| decode_first | arrival_rate | 8.0 | 346.3073 | 654.4708 | 0.29 | 349.4823 | 0.0250 | 346.2009 |
| decode_first | arrival_rate | 8.0 | 348.8711 | 658.1466 | 0.29 | 352.0461 | 0.0250 | 348.7507 |
| fcfs | arrival_rate | 0.5 | 157.4682 | 291.8437 | 0.30 | 160.6432 | 0.0250 | 157.3697 |
| fcfs | arrival_rate | 0.5 | 151.8895 | 278.3604 | 0.30 | 155.0645 | 0.0250 | 151.8010 |
| fcfs | arrival_rate | 0.5 | 150.5648 | 287.9348 | 0.30 | 153.7398 | 0.0250 | 150.4676 |
| fcfs | arrival_rate | 1.0 | 256.6314 | 483.4077 | 0.30 | 259.8064 | 0.0250 | 256.5329 |
| fcfs | arrival_rate | 1.0 | 254.5856 | 476.4806 | 0.30 | 257.7606 | 0.0250 | 254.4971 |
| fcfs | arrival_rate | 1.0 | 254.2720 | 482.2674 | 0.30 | 257.4470 | 0.0250 | 254.1749 |
| fcfs | arrival_rate | 2.0 | 307.6039 | 580.5805 | 0.29 | 310.7789 | 0.0250 | 307.5055 |
| fcfs | arrival_rate | 2.0 | 305.9337 | 576.0750 | 0.29 | 309.1087 | 0.0250 | 305.8452 |
| fcfs | arrival_rate | 2.0 | 306.6385 | 579.9466 | 0.29 | 309.8135 | 0.0250 | 306.5414 |
| fcfs | arrival_rate | 4.0 | 333.0902 | 629.1670 | 0.29 | 336.2652 | 0.0250 | 332.9917 |
| fcfs | arrival_rate | 4.0 | 331.6077 | 625.8722 | 0.29 | 334.7827 | 0.0250 | 331.5192 |
| fcfs | arrival_rate | 4.0 | 332.8218 | 628.7862 | 0.29 | 335.9968 | 0.0250 | 332.7246 |
| fcfs | arrival_rate | 8.0 | 345.8333 | 653.4602 | 0.29 | 349.0083 | 0.0250 | 345.7348 |
| fcfs | arrival_rate | 8.0 | 344.4447 | 650.7708 | 0.29 | 347.6197 | 0.0250 | 344.3562 |
| fcfs | arrival_rate | 8.0 | 345.9134 | 653.2060 | 0.29 | 349.0884 | 0.0250 | 345.8162 |
| round_robin | arrival_rate | 0.5 | 8.4230 | 15.5335 | 0.30 | 315.2378 | 2.4159 | 0.0572 |
| round_robin | arrival_rate | 0.5 | 8.2502 | 14.9709 | 0.30 | 303.3625 | 2.3237 | 0.0485 |
| round_robin | arrival_rate | 0.5 | 8.0749 | 14.6495 | 0.30 | 301.3633 | 2.3094 | 0.0516 |
| round_robin | arrival_rate | 1.0 | 11.5254 | 20.2412 | 0.30 | 507.6885 | 3.9068 | 0.0644 |
| round_robin | arrival_rate | 1.0 | 11.3855 | 20.4899 | 0.30 | 502.1064 | 3.8639 | 0.0586 |
| round_robin | arrival_rate | 1.0 | 11.4602 | 20.3808 | 0.30 | 502.8825 | 3.8695 | 0.0569 |
| round_robin | arrival_rate | 2.0 | 12.6428 | 20.9159 | 0.29 | 597.0610 | 4.6017 | 0.0665 |
| round_robin | arrival_rate | 2.0 | 12.3888 | 21.0965 | 0.29 | 592.7474 | 4.5698 | 0.0552 |
| round_robin | arrival_rate | 2.0 | 12.5903 | 20.9823 | 0.29 | 595.3115 | 4.5884 | 0.0614 |
| round_robin | arrival_rate | 4.0 | 14.1663 | 21.0111 | 0.29 | 640.4917 | 4.9317 | 0.0852 |
| round_robin | arrival_rate | 4.0 | 13.6010 | 21.1366 | 0.29 | 636.9185 | 4.9080 | 0.0617 |
| round_robin | arrival_rate | 4.0 | 13.9726 | 20.9310 | 0.29 | 639.7722 | 4.9276 | 0.0746 |
| round_robin | arrival_rate | 8.0 | 16.6194 | 21.0341 | 0.29 | 662.1194 | 5.0827 | 0.1833 |
| round_robin | arrival_rate | 8.0 | 15.5838 | 21.2063 | 0.29 | 658.8975 | 5.0655 | 0.0947 |
| round_robin | arrival_rate | 8.0 | 16.4108 | 20.9377 | 0.29 | 661.8129 | 5.0819 | 0.1372 |
| spf | arrival_rate | 0.5 | 154.2031 | 538.6324 | 0.30 | 157.3781 | 0.0250 | 154.1029 |
| spf | arrival_rate | 0.5 | 149.8132 | 525.8329 | 0.29 | 152.9882 | 0.0250 | 149.7235 |
| spf | arrival_rate | 0.5 | 147.3414 | 508.2418 | 0.30 | 150.5164 | 0.0250 | 147.2434 |
| spf | arrival_rate | 1.0 | 253.2868 | 590.9378 | 0.29 | 256.4618 | 0.0250 | 253.1866 |
| spf | arrival_rate | 1.0 | 252.3900 | 601.8015 | 0.29 | 255.5650 | 0.0250 | 252.3002 |
| spf | arrival_rate | 1.0 | 250.6747 | 581.9884 | 0.29 | 253.8497 | 0.0250 | 250.5758 |
| spf | arrival_rate | 2.0 | 304.2570 | 623.5598 | 0.29 | 307.4320 | 0.0250 | 304.1566 |
| spf | arrival_rate | 2.0 | 303.6308 | 633.2323 | 0.29 | 306.8058 | 0.0250 | 303.5409 |
| spf | arrival_rate | 2.0 | 303.0214 | 632.5341 | 0.29 | 306.1964 | 0.0250 | 302.9224 |
| spf | arrival_rate | 4.0 | 329.6050 | 646.5479 | 0.29 | 332.7800 | 0.0250 | 329.5046 |
| spf | arrival_rate | 4.0 | 329.1596 | 645.6546 | 0.29 | 332.3346 | 0.0250 | 329.0696 |
| spf | arrival_rate | 4.0 | 329.1650 | 651.4091 | 0.29 | 332.3400 | 0.0250 | 329.0659 |
| spf | arrival_rate | 8.0 | 342.2967 | 663.7418 | 0.29 | 345.4717 | 0.0250 | 342.1962 |
| spf | arrival_rate | 8.0 | 341.9193 | 660.7122 | 0.29 | 345.0943 | 0.0250 | 341.8293 |
| spf | arrival_rate | 8.0 | 342.1727 | 664.3333 | 0.29 | 345.3477 | 0.0250 | 342.0735 |

## E2_prompt_mix

| Policy | Variable | Value | TTFT Mean | TTFT p99 | Throughput | E2E Mean | TPOT Mean | Wait Mean |
|--------|----------|-------|-----------|----------|------------|----------|-----------|-----------|
| decode_first | prompt_distribution | bimodal | 310.2570 | 585.5605 | 0.29 | 313.4320 | 0.0250 | 310.1347 |
| decode_first | prompt_distribution | bimodal | 307.7963 | 579.7750 | 0.29 | 310.9713 | 0.0250 | 307.6899 |
| decode_first | prompt_distribution | bimodal | 309.5962 | 584.8872 | 0.29 | 312.7712 | 0.0250 | 309.4759 |
| decode_first | prompt_distribution | long | 332.5129 | 627.1426 | 0.27 | 335.6879 | 0.0250 | 332.1908 |
| decode_first | prompt_distribution | long | 331.2202 | 623.3816 | 0.27 | 334.3952 | 0.0250 | 330.9040 |
| decode_first | prompt_distribution | long | 330.6520 | 626.4452 | 0.27 | 333.8270 | 0.0250 | 330.3323 |
| decode_first | prompt_distribution | short | 303.3380 | 572.5710 | 0.30 | 306.5130 | 0.0250 | 303.2780 |
| decode_first | prompt_distribution | short | 302.8829 | 570.0284 | 0.30 | 306.0579 | 0.0250 | 302.8234 |
| decode_first | prompt_distribution | short | 301.9078 | 572.0487 | 0.30 | 305.0828 | 0.0250 | 301.8480 |
| fcfs | prompt_distribution | bimodal | 307.6039 | 580.5805 | 0.29 | 310.7789 | 0.0250 | 307.5055 |
| fcfs | prompt_distribution | bimodal | 305.9337 | 576.0750 | 0.29 | 309.1087 | 0.0250 | 305.8452 |
| fcfs | prompt_distribution | bimodal | 306.6385 | 579.9466 | 0.29 | 309.8135 | 0.0250 | 306.5414 |
| fcfs | prompt_distribution | long | 321.3303 | 606.2414 | 0.28 | 324.5053 | 0.0250 | 321.1085 |
| fcfs | prompt_distribution | long | 320.3413 | 602.9008 | 0.28 | 323.5163 | 0.0250 | 320.1237 |
| fcfs | prompt_distribution | long | 319.6626 | 605.6240 | 0.28 | 322.8376 | 0.0250 | 319.4424 |
| fcfs | prompt_distribution | short | 303.3380 | 572.5710 | 0.30 | 306.5130 | 0.0250 | 303.2780 |
| fcfs | prompt_distribution | short | 302.8829 | 570.0284 | 0.30 | 306.0579 | 0.0250 | 302.8234 |
| fcfs | prompt_distribution | short | 301.9078 | 572.0487 | 0.30 | 305.0828 | 0.0250 | 301.8480 |
| round_robin | prompt_distribution | bimodal | 12.6428 | 20.9159 | 0.29 | 597.0610 | 4.6017 | 0.0665 |
| round_robin | prompt_distribution | bimodal | 12.3888 | 21.0965 | 0.29 | 592.7474 | 4.5698 | 0.0552 |
| round_robin | prompt_distribution | bimodal | 12.5903 | 20.9823 | 0.29 | 595.3115 | 4.5884 | 0.0614 |
| round_robin | prompt_distribution | long | 16.9981 | 26.4788 | 0.28 | 632.7770 | 4.8487 | 0.1240 |
| round_robin | prompt_distribution | long | 16.4820 | 25.9266 | 0.28 | 629.9344 | 4.8303 | 0.1017 |
| round_robin | prompt_distribution | long | 17.0871 | 27.2379 | 0.28 | 630.2625 | 4.8282 | 0.1284 |
| round_robin | prompt_distribution | short | 11.6906 | 20.8177 | 0.30 | 585.9500 | 4.5217 | 0.0485 |
| round_robin | prompt_distribution | short | 11.7266 | 20.8761 | 0.30 | 584.4904 | 4.5100 | 0.0529 |
| round_robin | prompt_distribution | short | 11.7227 | 20.7873 | 0.30 | 584.0415 | 4.5064 | 0.0490 |
| spf | prompt_distribution | bimodal | 304.2570 | 623.5598 | 0.29 | 307.4320 | 0.0250 | 304.1566 |
| spf | prompt_distribution | bimodal | 303.6308 | 633.2323 | 0.29 | 306.8058 | 0.0250 | 303.5409 |
| spf | prompt_distribution | bimodal | 303.0214 | 632.5341 | 0.29 | 306.1964 | 0.0250 | 302.9224 |
| spf | prompt_distribution | long | 319.0508 | 615.3142 | 0.28 | 322.2258 | 0.0250 | 318.8261 |
| spf | prompt_distribution | long | 318.1920 | 616.5622 | 0.28 | 321.3670 | 0.0250 | 317.9720 |
| spf | prompt_distribution | long | 317.6208 | 617.7003 | 0.28 | 320.7958 | 0.0250 | 317.3973 |
| spf | prompt_distribution | short | 303.4147 | 576.1636 | 0.29 | 306.5897 | 0.0250 | 303.3544 |
| spf | prompt_distribution | short | 302.9598 | 575.9270 | 0.29 | 306.1348 | 0.0250 | 302.9001 |
| spf | prompt_distribution | short | 301.9519 | 578.5268 | 0.29 | 305.1269 | 0.0250 | 301.8917 |

## E3_output_length

| Policy | Variable | Value | TTFT Mean | TTFT p99 | Throughput | E2E Mean | TPOT Mean | Wait Mean |
|--------|----------|-------|-----------|----------|------------|----------|-----------|-----------|
| decode_first | max_output_tokens | 128 | 310.2570 | 585.5605 | 0.29 | 313.4320 | 0.0250 | 310.1347 |
| decode_first | max_output_tokens | 128 | 307.7963 | 579.7750 | 0.29 | 310.9713 | 0.0250 | 307.6899 |
| decode_first | max_output_tokens | 128 | 309.5962 | 584.8872 | 0.29 | 312.7712 | 0.0250 | 309.4759 |
| decode_first | max_output_tokens | 32 | 48.1236 | 89.4031 | 1.09 | 48.8986 | 0.0250 | 48.0012 |
| decode_first | max_output_tokens | 32 | 44.9963 | 82.9510 | 1.11 | 45.7713 | 0.0250 | 44.8899 |
| decode_first | max_output_tokens | 32 | 46.7962 | 88.0632 | 1.09 | 47.5712 | 0.0250 | 46.6759 |
| decode_first | max_output_tokens | 512 | 1361.4570 | 2572.8565 | 0.07 | 1374.2320 | 0.0250 | 1361.3347 |
| decode_first | max_output_tokens | 512 | 1358.9963 | 2567.0710 | 0.07 | 1371.7713 | 0.0250 | 1358.8899 |
| decode_first | max_output_tokens | 512 | 1360.7962 | 2572.1832 | 0.07 | 1373.5712 | 0.0250 | 1360.6759 |
| fcfs | max_output_tokens | 128 | 307.6039 | 580.5805 | 0.29 | 310.7789 | 0.0250 | 307.5055 |
| fcfs | max_output_tokens | 128 | 305.9337 | 576.0750 | 0.29 | 309.1087 | 0.0250 | 305.8452 |
| fcfs | max_output_tokens | 128 | 306.6385 | 579.9466 | 0.29 | 309.8135 | 0.0250 | 306.5414 |
| fcfs | max_output_tokens | 32 | 45.4705 | 84.4231 | 1.12 | 46.2455 | 0.0250 | 45.3720 |
| fcfs | max_output_tokens | 32 | 43.1337 | 79.2510 | 1.13 | 43.9087 | 0.0250 | 43.0452 |
| fcfs | max_output_tokens | 32 | 43.8385 | 83.1226 | 1.12 | 44.6135 | 0.0250 | 43.7414 |
| fcfs | max_output_tokens | 512 | 1358.8039 | 2567.8765 | 0.07 | 1371.5789 | 0.0250 | 1358.7055 |
| fcfs | max_output_tokens | 512 | 1357.1337 | 2563.3710 | 0.07 | 1369.9087 | 0.0250 | 1357.0452 |
| fcfs | max_output_tokens | 512 | 1357.8385 | 2567.2426 | 0.07 | 1370.6135 | 0.0250 | 1357.7414 |
| round_robin | max_output_tokens | 128 | 12.6428 | 20.9159 | 0.29 | 597.0610 | 4.6017 | 0.0665 |
| round_robin | max_output_tokens | 128 | 12.3888 | 21.0965 | 0.29 | 592.7474 | 4.5698 | 0.0552 |
| round_robin | max_output_tokens | 128 | 12.5903 | 20.9823 | 0.29 | 595.3115 | 4.5884 | 0.0614 |
| round_robin | max_output_tokens | 32 | 9.8102 | 15.8944 | 1.12 | 89.0710 | 2.5568 | 0.0620 |
| round_robin | max_output_tokens | 32 | 9.3495 | 15.7661 | 1.13 | 83.7994 | 2.4016 | 0.0552 |
| round_robin | max_output_tokens | 32 | 9.4536 | 15.5823 | 1.12 | 85.5849 | 2.4558 | 0.0614 |
| round_robin | max_output_tokens | 512 | 12.7195 | 21.0159 | 0.07 | 2613.1805 | 5.0890 | 0.0665 |
| round_robin | max_output_tokens | 512 | 12.3888 | 21.0965 | 0.07 | 2608.7474 | 5.0809 | 0.0552 |
| round_robin | max_output_tokens | 512 | 12.5903 | 20.9823 | 0.07 | 2611.3115 | 5.0856 | 0.0614 |
| spf | max_output_tokens | 128 | 304.2570 | 623.5598 | 0.29 | 307.4320 | 0.0250 | 304.1566 |
| spf | max_output_tokens | 128 | 303.6308 | 633.2323 | 0.29 | 306.8058 | 0.0250 | 303.5409 |
| spf | max_output_tokens | 128 | 303.0214 | 632.5341 | 0.29 | 306.1964 | 0.0250 | 302.9224 |
| spf | max_output_tokens | 32 | 41.9567 | 157.1679 | 1.10 | 42.7317 | 0.0250 | 41.8566 |
| spf | max_output_tokens | 32 | 40.6193 | 147.4643 | 1.11 | 41.3943 | 0.0250 | 40.5297 |
| spf | max_output_tokens | 32 | 40.2785 | 150.1076 | 1.12 | 41.0535 | 0.0250 | 40.1805 |
| spf | max_output_tokens | 512 | 1355.4570 | 2583.4472 | 0.07 | 1368.2320 | 0.0250 | 1355.3566 |
| spf | max_output_tokens | 512 | 1354.8308 | 2593.5267 | 0.07 | 1367.6058 | 0.0250 | 1354.7409 |
| spf | max_output_tokens | 512 | 1354.3087 | 2612.8565 | 0.07 | 1367.0837 | 0.0250 | 1354.2096 |

## E4_rr_quantum

| Policy | Variable | Value | TTFT Mean | TTFT p99 | Throughput | E2E Mean | TPOT Mean | Wait Mean |
|--------|----------|-------|-----------|----------|------------|----------|-----------|-----------|
| round_robin | rr_quantum | 1 | 3.3167 | 5.7766 | 0.29 | 603.8311 | 4.7285 | 0.0283 |
| round_robin | rr_quantum | 1 | 3.2332 | 5.8298 | 0.29 | 599.4543 | 4.6947 | 0.0194 |
| round_robin | rr_quantum | 1 | 3.3169 | 5.4891 | 0.29 | 601.9742 | 4.7138 | 0.0216 |
| round_robin | rr_quantum | 16 | 47.6616 | 82.7648 | 0.29 | 569.0710 | 4.1056 | 0.2175 |
| round_robin | rr_quantum | 16 | 47.3986 | 82.9166 | 0.29 | 565.5299 | 4.0798 | 0.2132 |
| round_robin | rr_quantum | 16 | 47.5183 | 82.8843 | 0.29 | 567.8520 | 4.0971 | 0.2134 |
| round_robin | rr_quantum | 4 | 12.6428 | 20.9159 | 0.29 | 597.0610 | 4.6017 | 0.0665 |
| round_robin | rr_quantum | 4 | 12.3888 | 21.0965 | 0.29 | 592.7474 | 4.5698 | 0.0552 |
| round_robin | rr_quantum | 4 | 12.5903 | 20.9823 | 0.29 | 595.3115 | 4.5884 | 0.0614 |
| round_robin | rr_quantum | 64 | 175.0828 | 319.8337 | 0.29 | 455.3930 | 2.2072 | 0.8255 |
| round_robin | rr_quantum | 64 | 174.1940 | 318.5246 | 0.29 | 451.4339 | 2.1830 | 0.8932 |
| round_robin | rr_quantum | 64 | 173.7990 | 317.6923 | 0.29 | 454.1480 | 2.2075 | 0.8854 |

## E5_burst_arrival

| Policy | Variable | Value | TTFT Mean | TTFT p99 | Throughput | E2E Mean | TPOT Mean | Wait Mean |
|--------|----------|-------|-----------|----------|------------|----------|-----------|-----------|
| decode_first | None | None | 336.1825 | 632.6712 | 0.29 | 339.3575 | 0.0250 | 336.0601 |
| decode_first | None | None | 334.0989 | 629.3053 | 0.29 | 337.2739 | 0.0250 | 333.9925 |
| decode_first | None | None | 336.9146 | 632.4943 | 0.29 | 340.0896 | 0.0250 | 336.7943 |
| fcfs | None | None | 333.5294 | 627.6912 | 0.29 | 336.7044 | 0.0250 | 333.4309 |
| fcfs | None | None | 332.2363 | 625.6053 | 0.29 | 335.4113 | 0.0250 | 332.1478 |
| fcfs | None | None | 333.9569 | 627.5537 | 0.29 | 337.1319 | 0.0250 | 333.8598 |
| round_robin | None | None | 14.5483 | 21.6025 | 0.29 | 639.1385 | 4.9180 | 0.6709 |
| round_robin | None | None | 14.0782 | 21.7095 | 0.29 | 636.0025 | 4.8970 | 0.6278 |
| round_robin | None | None | 14.4491 | 21.3634 | 0.29 | 639.4024 | 4.9209 | 0.6898 |
| spf | None | None | 330.0373 | 645.2508 | 0.29 | 333.2123 | 0.0250 | 329.9369 |
| spf | None | None | 329.7904 | 644.5610 | 0.29 | 332.9654 | 0.0250 | 329.7004 |
| spf | None | None | 330.2499 | 653.0231 | 0.29 | 333.4249 | 0.0250 | 330.1508 |
