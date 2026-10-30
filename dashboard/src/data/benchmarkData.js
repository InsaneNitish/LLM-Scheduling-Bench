export const BENCHMARK_DATA = {
  "E1_load_sweep": [
    {
      "policy": "fcfs",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.032,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2983,
        "ttft": {
          "mean": 157.4682,
          "p50": 164.5591,
          "p95": 278.5911,
          "p99": 291.8437
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 160.6432,
          "p50": 167.7341,
          "p95": 281.7661,
          "p99": 295.0187
        },
        "waiting_time": {
          "mean": 157.3697,
          "p50": 164.5006,
          "p95": 278.5358,
          "p99": 291.7867
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "fcfs",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.032,
      "summary": {
        "count": 200,
        "throughput_rps": 0.3005,
        "ttft": {
          "mean": 151.8895,
          "p50": 158.4372,
          "p95": 271.1662,
          "p99": 278.3604
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 155.0645,
          "p50": 161.6122,
          "p95": 274.3412,
          "p99": 281.5354
        },
        "waiting_time": {
          "mean": 151.801,
          "p50": 158.3824,
          "p95": 271.0926,
          "p99": 278.298
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "fcfs",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.029,
      "summary": {
        "count": 200,
        "throughput_rps": 0.3,
        "ttft": {
          "mean": 150.5648,
          "p50": 149.0004,
          "p95": 280.7942,
          "p99": 287.9348
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 153.7398,
          "p50": 152.1754,
          "p95": 283.9692,
          "p99": 291.1098
        },
        "waiting_time": {
          "mean": 150.4676,
          "p50": 148.9379,
          "p95": 280.7383,
          "p99": 287.8789
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "fcfs",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.03,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2952,
        "ttft": {
          "mean": 256.6314,
          "p50": 260.0305,
          "p95": 462.9206,
          "p99": 483.4077
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 259.8064,
          "p50": 263.2055,
          "p95": 466.0956,
          "p99": 486.5827
        },
        "waiting_time": {
          "mean": 256.5329,
          "p50": 259.972,
          "p95": 462.857,
          "p99": 483.3506
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.035,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2961,
        "ttft": {
          "mean": 254.5856,
          "p50": 257.8717,
          "p95": 461.3245,
          "p99": 476.4806
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 257.7606,
          "p50": 261.0467,
          "p95": 464.4995,
          "p99": 479.6556
        },
        "waiting_time": {
          "mean": 254.4971,
          "p50": 257.817,
          "p95": 461.2725,
          "p99": 476.2785
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.033,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2957,
        "ttft": {
          "mean": 254.272,
          "p50": 253.6473,
          "p95": 465.8132,
          "p99": 482.2674
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 257.447,
          "p50": 256.8223,
          "p95": 468.9882,
          "p99": 485.4424
        },
        "waiting_time": {
          "mean": 254.1749,
          "p50": 253.5848,
          "p95": 465.7573,
          "p99": 482.2115
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.033,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 307.6039,
          "p50": 309.157,
          "p95": 557.2603,
          "p99": 580.5805
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 310.7789,
          "p50": 312.332,
          "p95": 560.4353,
          "p99": 583.7555
        },
        "waiting_time": {
          "mean": 307.5055,
          "p50": 309.0985,
          "p95": 557.1967,
          "p99": 580.5235
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.034,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 305.9337,
          "p50": 307.589,
          "p95": 555.3902,
          "p99": 576.075
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 309.1087,
          "p50": 310.764,
          "p95": 558.5652,
          "p99": 579.25
        },
        "waiting_time": {
          "mean": 305.8452,
          "p50": 307.5342,
          "p95": 555.3382,
          "p99": 575.8729
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.038,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 306.6385,
          "p50": 306.4837,
          "p95": 558.8356,
          "p99": 579.9466
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 309.8135,
          "p50": 309.6587,
          "p95": 562.0106,
          "p99": 583.1216
        },
        "waiting_time": {
          "mean": 306.5414,
          "p50": 306.4212,
          "p95": 558.7797,
          "p99": 579.8906
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.031,
      "summary": {
        "count": 200,
        "throughput_rps": 0.292,
        "ttft": {
          "mean": 333.0902,
          "p50": 333.7202,
          "p95": 604.4302,
          "p99": 629.167
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 336.2652,
          "p50": 336.8952,
          "p95": 607.6052,
          "p99": 632.342
        },
        "waiting_time": {
          "mean": 332.9917,
          "p50": 333.6617,
          "p95": 604.3666,
          "p99": 629.1099
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.033,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2929,
        "ttft": {
          "mean": 331.6077,
          "p50": 332.4476,
          "p95": 602.4231,
          "p99": 625.8722
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 334.7827,
          "p50": 335.6226,
          "p95": 605.5981,
          "p99": 629.0472
        },
        "waiting_time": {
          "mean": 331.5192,
          "p50": 332.3929,
          "p95": 602.371,
          "p99": 625.6701
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.032,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2921,
        "ttft": {
          "mean": 332.8218,
          "p50": 332.9018,
          "p95": 605.3467,
          "p99": 628.7862
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 335.9968,
          "p50": 336.0768,
          "p95": 608.5217,
          "p99": 631.9612
        },
        "waiting_time": {
          "mean": 332.7246,
          "p50": 332.8393,
          "p95": 605.2908,
          "p99": 628.7302
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.038,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2915,
        "ttft": {
          "mean": 345.8333,
          "p50": 346.0019,
          "p95": 628.0151,
          "p99": 653.4602
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 349.0083,
          "p50": 349.1769,
          "p95": 631.1901,
          "p99": 656.6352
        },
        "waiting_time": {
          "mean": 345.7348,
          "p50": 345.9434,
          "p95": 627.9515,
          "p99": 653.4031
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.033,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2924,
        "ttft": {
          "mean": 344.4447,
          "p50": 344.8769,
          "p95": 625.9395,
          "p99": 650.7708
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 347.6197,
          "p50": 348.0519,
          "p95": 629.1145,
          "p99": 653.9458
        },
        "waiting_time": {
          "mean": 344.3562,
          "p50": 344.8222,
          "p95": 625.8874,
          "p99": 650.5687
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "fcfs",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.034,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2916,
        "ttft": {
          "mean": 345.9134,
          "p50": 346.1109,
          "p95": 628.6023,
          "p99": 653.206
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 349.0884,
          "p50": 349.2859,
          "p95": 631.7773,
          "p99": 656.381
        },
        "waiting_time": {
          "mean": 345.8162,
          "p50": 346.0484,
          "p95": 628.5464,
          "p99": 653.15
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.072,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2983,
        "ttft": {
          "mean": 8.423,
          "p50": 7.9253,
          "p95": 15.3604,
          "p99": 15.5335
        },
        "tpot": {
          "mean": 2.4159,
          "p50": 2.7097,
          "p95": 3.0143,
          "p99": 3.0262
        },
        "e2e_latency": {
          "mean": 315.2378,
          "p50": 351.7974,
          "p95": 392.3056,
          "p99": 393.5086
        },
        "waiting_time": {
          "mean": 0.0572,
          "p50": 0.0526,
          "p95": 0.0983,
          "p99": 0.208
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "round_robin",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.043,
      "summary": {
        "count": 200,
        "throughput_rps": 0.3005,
        "ttft": {
          "mean": 8.2502,
          "p50": 8.5289,
          "p95": 14.3144,
          "p99": 14.9709
        },
        "tpot": {
          "mean": 2.3237,
          "p50": 2.5405,
          "p95": 2.9048,
          "p99": 2.911
        },
        "e2e_latency": {
          "mean": 303.3625,
          "p50": 334.3489,
          "p95": 378.1451,
          "p99": 378.5185
        },
        "waiting_time": {
          "mean": 0.0485,
          "p50": 0.0439,
          "p95": 0.0924,
          "p99": 0.098
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "round_robin",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.048,
      "summary": {
        "count": 200,
        "throughput_rps": 0.3,
        "ttft": {
          "mean": 8.0749,
          "p50": 8.242,
          "p95": 14.2191,
          "p99": 14.6495
        },
        "tpot": {
          "mean": 2.3094,
          "p50": 2.5827,
          "p95": 2.9349,
          "p99": 2.9399
        },
        "e2e_latency": {
          "mean": 301.3633,
          "p50": 337.0463,
          "p95": 381.6838,
          "p99": 382.49
        },
        "waiting_time": {
          "mean": 0.0516,
          "p50": 0.0502,
          "p95": 0.0916,
          "p99": 0.2073
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "round_robin",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.047,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2952,
        "ttft": {
          "mean": 11.5254,
          "p50": 11.2225,
          "p95": 20.0635,
          "p99": 20.2412
        },
        "tpot": {
          "mean": 3.9068,
          "p50": 4.0314,
          "p95": 4.2197,
          "p99": 4.2288
        },
        "e2e_latency": {
          "mean": 507.6885,
          "p50": 524.9375,
          "p95": 546.8914,
          "p99": 547.6167
        },
        "waiting_time": {
          "mean": 0.0644,
          "p50": 0.0601,
          "p95": 0.1371,
          "p99": 0.2512
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.056,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2961,
        "ttft": {
          "mean": 11.3855,
          "p50": 11.4117,
          "p95": 20.2507,
          "p99": 20.4899
        },
        "tpot": {
          "mean": 3.8639,
          "p50": 3.9903,
          "p95": 4.1768,
          "p99": 4.1843
        },
        "e2e_latency": {
          "mean": 502.1064,
          "p50": 521.0361,
          "p95": 541.7512,
          "p99": 542.3516
        },
        "waiting_time": {
          "mean": 0.0586,
          "p50": 0.0578,
          "p95": 0.0978,
          "p99": 0.192
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.052,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2957,
        "ttft": {
          "mean": 11.4602,
          "p50": 11.7279,
          "p95": 19.8808,
          "p99": 20.3808
        },
        "tpot": {
          "mean": 3.8695,
          "p50": 4.0006,
          "p95": 4.1885,
          "p99": 4.1918
        },
        "e2e_latency": {
          "mean": 502.8825,
          "p50": 519.7349,
          "p95": 543.2664,
          "p99": 543.69
        },
        "waiting_time": {
          "mean": 0.0569,
          "p50": 0.0519,
          "p95": 0.0979,
          "p99": 0.2226
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.053,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 12.6428,
          "p50": 12.386,
          "p95": 20.677,
          "p99": 20.9159
        },
        "tpot": {
          "mean": 4.6017,
          "p50": 4.6538,
          "p95": 4.753,
          "p99": 4.7579
        },
        "e2e_latency": {
          "mean": 597.061,
          "p50": 604.961,
          "p95": 615.0021,
          "p99": 616.6248
        },
        "waiting_time": {
          "mean": 0.0665,
          "p50": 0.0574,
          "p95": 0.1855,
          "p99": 0.3015
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.056,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 12.3888,
          "p50": 12.2682,
          "p95": 20.8573,
          "p99": 21.0965
        },
        "tpot": {
          "mean": 4.5698,
          "p50": 4.6227,
          "p95": 4.7237,
          "p99": 4.7244
        },
        "e2e_latency": {
          "mean": 592.7474,
          "p50": 602.0486,
          "p95": 611.9627,
          "p99": 612.2004
        },
        "waiting_time": {
          "mean": 0.0552,
          "p50": 0.0483,
          "p95": 0.1096,
          "p99": 0.1706
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 12.5903,
          "p50": 12.8267,
          "p95": 20.4731,
          "p99": 20.9823
        },
        "tpot": {
          "mean": 4.5884,
          "p50": 4.6435,
          "p95": 4.7346,
          "p99": 4.7404
        },
        "e2e_latency": {
          "mean": 595.3115,
          "p50": 603.4207,
          "p95": 613.8519,
          "p99": 614.3308
        },
        "waiting_time": {
          "mean": 0.0614,
          "p50": 0.0575,
          "p95": 0.1295,
          "p99": 0.2378
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.049,
      "summary": {
        "count": 200,
        "throughput_rps": 0.292,
        "ttft": {
          "mean": 14.1663,
          "p50": 16.7117,
          "p95": 20.7387,
          "p99": 21.0111
        },
        "tpot": {
          "mean": 4.9317,
          "p50": 4.938,
          "p95": 5.0064,
          "p99": 5.0101
        },
        "e2e_latency": {
          "mean": 640.4917,
          "p50": 644.4598,
          "p95": 649.5317,
          "p99": 649.8539
        },
        "waiting_time": {
          "mean": 0.0852,
          "p50": 0.0716,
          "p95": 0.2319,
          "p99": 0.3154
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2929,
        "ttft": {
          "mean": 13.601,
          "p50": 14.9394,
          "p95": 20.8174,
          "p99": 21.1366
        },
        "tpot": {
          "mean": 4.908,
          "p50": 4.9222,
          "p95": 4.9843,
          "p99": 4.9877
        },
        "e2e_latency": {
          "mean": 636.9185,
          "p50": 641.342,
          "p95": 646.1739,
          "p99": 646.3083
        },
        "waiting_time": {
          "mean": 0.0617,
          "p50": 0.0512,
          "p95": 0.1585,
          "p99": 0.2045
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.048,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2921,
        "ttft": {
          "mean": 13.9726,
          "p50": 15.9777,
          "p95": 20.4643,
          "p99": 20.931
        },
        "tpot": {
          "mean": 4.9276,
          "p50": 4.9421,
          "p95": 4.9979,
          "p99": 4.9999
        },
        "e2e_latency": {
          "mean": 639.7722,
          "p50": 642.6507,
          "p95": 648.3726,
          "p99": 648.5358
        },
        "waiting_time": {
          "mean": 0.0746,
          "p50": 0.0572,
          "p95": 0.2009,
          "p99": 0.2977
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.05,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2915,
        "ttft": {
          "mean": 16.6194,
          "p50": 18.5589,
          "p95": 20.7655,
          "p99": 21.0341
        },
        "tpot": {
          "mean": 5.0827,
          "p50": 5.0844,
          "p95": 5.1017,
          "p99": 5.1045
        },
        "e2e_latency": {
          "mean": 662.1194,
          "p50": 663.8364,
          "p95": 665.1127,
          "p99": 665.4402
        },
        "waiting_time": {
          "mean": 0.1833,
          "p50": 0.1053,
          "p95": 0.5645,
          "p99": 0.7302
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2924,
        "ttft": {
          "mean": 15.5838,
          "p50": 17.6261,
          "p95": 20.8916,
          "p99": 21.2063
        },
        "tpot": {
          "mean": 5.0655,
          "p50": 5.0711,
          "p95": 5.0927,
          "p99": 5.0944
        },
        "e2e_latency": {
          "mean": 658.8975,
          "p50": 661.0349,
          "p95": 663.2602,
          "p99": 663.5286
        },
        "waiting_time": {
          "mean": 0.0947,
          "p50": 0.0754,
          "p95": 0.2555,
          "p99": 0.3432
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "round_robin",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.055,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2916,
        "ttft": {
          "mean": 16.4108,
          "p50": 17.8093,
          "p95": 20.5099,
          "p99": 20.9377
        },
        "tpot": {
          "mean": 5.0819,
          "p50": 5.0873,
          "p95": 5.1007,
          "p99": 5.1041
        },
        "e2e_latency": {
          "mean": 661.8129,
          "p50": 663.3355,
          "p95": 664.9205,
          "p99": 665.1246
        },
        "waiting_time": {
          "mean": 0.1372,
          "p50": 0.0902,
          "p95": 0.3789,
          "p99": 0.4916
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "spf",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.044,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2972,
        "ttft": {
          "mean": 154.2031,
          "p50": 97.3657,
          "p95": 476.92,
          "p99": 538.6324
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 157.3781,
          "p50": 100.5407,
          "p95": 480.095,
          "p99": 541.8074
        },
        "waiting_time": {
          "mean": 154.1029,
          "p50": 97.2987,
          "p95": 476.641,
          "p99": 538.3598
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "spf",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.042,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2941,
        "ttft": {
          "mean": 149.8132,
          "p50": 108.4551,
          "p95": 410.265,
          "p99": 525.8329
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 152.9882,
          "p50": 111.6301,
          "p95": 413.44,
          "p99": 529.0079
        },
        "waiting_time": {
          "mean": 149.7235,
          "p50": 108.3883,
          "p95": 410.0638,
          "p99": 525.5519
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "spf",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.045,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2981,
        "ttft": {
          "mean": 147.3414,
          "p50": 77.608,
          "p95": 464.6698,
          "p99": 508.2418
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 150.5164,
          "p50": 80.783,
          "p95": 467.8448,
          "p99": 511.4168
        },
        "waiting_time": {
          "mean": 147.2434,
          "p50": 77.5522,
          "p95": 464.3865,
          "p99": 508.0
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "spf",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.045,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2932,
        "ttft": {
          "mean": 253.2868,
          "p50": 226.8445,
          "p95": 546.1988,
          "p99": 590.9378
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 256.4618,
          "p50": 230.0195,
          "p95": 549.3738,
          "p99": 594.1128
        },
        "waiting_time": {
          "mean": 253.1866,
          "p50": 226.7875,
          "p95": 545.9465,
          "p99": 590.6653
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "spf",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.04,
      "summary": {
        "count": 200,
        "throughput_rps": 0.293,
        "ttft": {
          "mean": 252.39,
          "p50": 226.7045,
          "p95": 540.8802,
          "p99": 601.8015
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 255.565,
          "p50": 229.8795,
          "p95": 544.0552,
          "p99": 604.9765
        },
        "waiting_time": {
          "mean": 252.3002,
          "p50": 226.639,
          "p95": 540.6645,
          "p99": 601.5299
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "spf",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.049,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2924,
        "ttft": {
          "mean": 250.6747,
          "p50": 208.7956,
          "p95": 554.3192,
          "p99": 581.9884
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 253.8497,
          "p50": 211.9706,
          "p95": 557.4942,
          "p99": 585.1634
        },
        "waiting_time": {
          "mean": 250.5758,
          "p50": 208.7341,
          "p95": 554.049,
          "p99": 581.7481
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.048,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2921,
        "ttft": {
          "mean": 304.257,
          "p50": 288.6159,
          "p95": 594.5998,
          "p99": 623.5598
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 307.432,
          "p50": 291.7909,
          "p95": 597.7748,
          "p99": 626.7348
        },
        "waiting_time": {
          "mean": 304.1566,
          "p50": 288.5619,
          "p95": 594.3443,
          "p99": 623.2872
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.044,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 303.6308,
          "p50": 288.0981,
          "p95": 587.7228,
          "p99": 633.2323
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.8058,
          "p50": 291.2731,
          "p95": 590.8978,
          "p99": 636.4073
        },
        "waiting_time": {
          "mean": 303.5409,
          "p50": 288.0368,
          "p95": 587.5046,
          "p99": 632.9608
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.045,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2914,
        "ttft": {
          "mean": 303.0214,
          "p50": 287.3575,
          "p95": 603.7506,
          "p99": 632.5341
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.1964,
          "p50": 290.5325,
          "p95": 606.9256,
          "p99": 635.7091
        },
        "waiting_time": {
          "mean": 302.9224,
          "p50": 287.301,
          "p95": 603.5087,
          "p99": 632.2585
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "spf",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.044,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2915,
        "ttft": {
          "mean": 329.605,
          "p50": 328.4909,
          "p95": 626.4089,
          "p99": 646.5479
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 332.78,
          "p50": 331.6659,
          "p95": 629.5839,
          "p99": 649.7229
        },
        "waiting_time": {
          "mean": 329.5046,
          "p50": 328.4277,
          "p95": 626.1263,
          "p99": 646.2534
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "spf",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.045,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 329.1596,
          "p50": 321.0899,
          "p95": 623.2618,
          "p99": 645.6546
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 332.3346,
          "p50": 324.2649,
          "p95": 626.4368,
          "p99": 648.8296
        },
        "waiting_time": {
          "mean": 329.0696,
          "p50": 321.0292,
          "p95": 623.0295,
          "p99": 645.383
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "spf",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.046,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2911,
        "ttft": {
          "mean": 329.165,
          "p50": 319.255,
          "p95": 626.689,
          "p99": 651.4091
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 332.34,
          "p50": 322.43,
          "p95": 629.864,
          "p99": 654.5841
        },
        "waiting_time": {
          "mean": 329.0659,
          "p50": 319.194,
          "p95": 626.4271,
          "p99": 651.1225
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "spf",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.047,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2912,
        "ttft": {
          "mean": 342.2967,
          "p50": 345.2068,
          "p95": 638.9969,
          "p99": 663.7418
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 345.4717,
          "p50": 348.3818,
          "p95": 642.1719,
          "p99": 666.9168
        },
        "waiting_time": {
          "mean": 342.1962,
          "p50": 345.1436,
          "p95": 638.7225,
          "p99": 663.4493
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "spf",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.046,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 341.9193,
          "p50": 340.6148,
          "p95": 635.43,
          "p99": 660.7122
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 345.0943,
          "p50": 343.7898,
          "p95": 638.605,
          "p99": 663.8872
        },
        "waiting_time": {
          "mean": 341.8293,
          "p50": 340.5518,
          "p95": 635.1977,
          "p99": 660.4367
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "spf",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.047,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2911,
        "ttft": {
          "mean": 342.1727,
          "p50": 342.4936,
          "p95": 637.0892,
          "p99": 664.3333
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 345.3477,
          "p50": 345.6686,
          "p95": 640.2642,
          "p99": 667.5083
        },
        "waiting_time": {
          "mean": 342.0735,
          "p50": 342.4336,
          "p95": 636.8391,
          "p99": 664.0468
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.191,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2961,
        "ttft": {
          "mean": 160.1213,
          "p50": 167.0391,
          "p95": 283.3111,
          "p99": 296.8237
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 163.2963,
          "p50": 170.2141,
          "p95": 286.4861,
          "p99": 299.9987
        },
        "waiting_time": {
          "mean": 159.9989,
          "p50": 166.9806,
          "p95": 283.2558,
          "p99": 296.7667
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "decode_first",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.216,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2989,
        "ttft": {
          "mean": 153.7521,
          "p50": 160.3172,
          "p95": 274.6092,
          "p99": 282.0578
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 156.9271,
          "p50": 163.4922,
          "p95": 277.7842,
          "p99": 285.2328
        },
        "waiting_time": {
          "mean": 153.6457,
          "p50": 160.2624,
          "p95": 274.5326,
          "p99": 281.9954
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "decode_first",
      "arrival_rate": 0.5,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.207,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2979,
        "ttft": {
          "mean": 153.2625,
          "p50": 151.8804,
          "p95": 285.4742,
          "p99": 292.6154
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 156.4375,
          "p50": 155.0554,
          "p95": 288.6492,
          "p99": 295.7904
        },
        "waiting_time": {
          "mean": 153.1421,
          "p50": 151.8179,
          "p95": 285.4183,
          "p99": 292.5589
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 0.5
    },
    {
      "policy": "decode_first",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.281,
      "summary": {
        "count": 200,
        "throughput_rps": 0.293,
        "ttft": {
          "mean": 259.2845,
          "p50": 262.5105,
          "p95": 467.6406,
          "p99": 488.3877
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 262.4595,
          "p50": 265.6855,
          "p95": 470.8156,
          "p99": 491.5627
        },
        "waiting_time": {
          "mean": 259.1621,
          "p50": 262.452,
          "p95": 467.577,
          "p99": 488.3306
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.305,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2945,
        "ttft": {
          "mean": 256.4482,
          "p50": 259.7517,
          "p95": 464.7645,
          "p99": 480.1806
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 259.6232,
          "p50": 262.9267,
          "p95": 467.9395,
          "p99": 483.3556
        },
        "waiting_time": {
          "mean": 256.3418,
          "p50": 259.697,
          "p95": 464.7125,
          "p99": 479.8993
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 1.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.294,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2935,
        "ttft": {
          "mean": 257.2297,
          "p50": 256.7873,
          "p95": 470.7532,
          "p99": 487.208
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 260.4047,
          "p50": 259.9623,
          "p95": 473.9282,
          "p99": 490.383
        },
        "waiting_time": {
          "mean": 257.1094,
          "p50": 256.7248,
          "p95": 470.6973,
          "p99": 487.1515
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 1.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.318,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2909,
        "ttft": {
          "mean": 310.257,
          "p50": 311.637,
          "p95": 561.9803,
          "p99": 585.5605
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 313.432,
          "p50": 314.812,
          "p95": 565.1553,
          "p99": 588.7355
        },
        "waiting_time": {
          "mean": 310.1347,
          "p50": 311.5785,
          "p95": 561.9167,
          "p99": 585.5035
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.315,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2924,
        "ttft": {
          "mean": 307.7963,
          "p50": 309.469,
          "p95": 558.8302,
          "p99": 579.775
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 310.9713,
          "p50": 312.644,
          "p95": 562.0052,
          "p99": 582.95
        },
        "waiting_time": {
          "mean": 307.6899,
          "p50": 309.4142,
          "p95": 558.7782,
          "p99": 579.4937
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.287,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2912,
        "ttft": {
          "mean": 309.5962,
          "p50": 309.6237,
          "p95": 563.7756,
          "p99": 584.8872
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 312.7712,
          "p50": 312.7987,
          "p95": 566.9506,
          "p99": 588.0622
        },
        "waiting_time": {
          "mean": 309.4759,
          "p50": 309.5612,
          "p95": 563.7197,
          "p99": 584.8306
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 2.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.346,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2899,
        "ttft": {
          "mean": 335.7433,
          "p50": 336.2002,
          "p95": 609.1502,
          "p99": 634.147
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 338.9183,
          "p50": 339.3752,
          "p95": 612.3252,
          "p99": 637.322
        },
        "waiting_time": {
          "mean": 335.6209,
          "p50": 336.1417,
          "p95": 609.0866,
          "p99": 634.0899
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.357,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2913,
        "ttft": {
          "mean": 333.4703,
          "p50": 334.3276,
          "p95": 605.8631,
          "p99": 629.5722
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 336.6453,
          "p50": 337.5026,
          "p95": 609.0381,
          "p99": 632.7472
        },
        "waiting_time": {
          "mean": 333.3639,
          "p50": 334.2729,
          "p95": 605.811,
          "p99": 629.2909
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 4.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.334,
      "summary": {
        "count": 200,
        "throughput_rps": 0.29,
        "ttft": {
          "mean": 335.7795,
          "p50": 336.0418,
          "p95": 610.2867,
          "p99": 633.7268
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 338.9545,
          "p50": 339.2168,
          "p95": 613.4617,
          "p99": 636.9018
        },
        "waiting_time": {
          "mean": 335.6591,
          "p50": 335.9793,
          "p95": 610.2308,
          "p99": 633.6702
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 4.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.331,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2894,
        "ttft": {
          "mean": 348.4864,
          "p50": 348.4819,
          "p95": 632.7351,
          "p99": 658.4402
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 351.6614,
          "p50": 351.6569,
          "p95": 635.9101,
          "p99": 661.6152
        },
        "waiting_time": {
          "mean": 348.364,
          "p50": 348.4234,
          "p95": 632.6715,
          "p99": 658.3831
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.336,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2908,
        "ttft": {
          "mean": 346.3073,
          "p50": 346.7569,
          "p95": 629.3795,
          "p99": 654.4708
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 349.4823,
          "p50": 349.9319,
          "p95": 632.5545,
          "p99": 657.6458
        },
        "waiting_time": {
          "mean": 346.2009,
          "p50": 346.7022,
          "p95": 629.3274,
          "p99": 654.1895
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    },
    {
      "policy": "decode_first",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.339,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2894,
        "ttft": {
          "mean": 348.8711,
          "p50": 349.2509,
          "p95": 633.5423,
          "p99": 658.1466
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 352.0461,
          "p50": 352.4259,
          "p95": 636.7173,
          "p99": 661.3216
        },
        "waiting_time": {
          "mean": 348.7507,
          "p50": 349.1884,
          "p95": 633.4864,
          "p99": 658.09
        }
      },
      "experiment": "E1_load_sweep",
      "variable": "arrival_rate",
      "variable_value": 8.0
    }
  ],
  "E2_prompt_mix": [
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.036,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2965,
        "ttft": {
          "mean": 303.338,
          "p50": 305.1932,
          "p95": 549.6454,
          "p99": 572.571
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.513,
          "p50": 308.3682,
          "p95": 552.8204,
          "p99": 575.746
        },
        "waiting_time": {
          "mean": 303.278,
          "p50": 305.1355,
          "p95": 549.5936,
          "p99": 572.5145
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.031,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2966,
        "ttft": {
          "mean": 302.8829,
          "p50": 304.5087,
          "p95": 549.8226,
          "p99": 570.0284
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.0579,
          "p50": 307.6837,
          "p95": 552.9976,
          "p99": 573.2034
        },
        "waiting_time": {
          "mean": 302.8234,
          "p50": 304.4537,
          "p95": 549.7721,
          "p99": 569.9754
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.03,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2968,
        "ttft": {
          "mean": 301.9078,
          "p50": 301.4334,
          "p95": 550.9399,
          "p99": 572.0487
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 305.0828,
          "p50": 304.6084,
          "p95": 554.1149,
          "p99": 575.2237
        },
        "waiting_time": {
          "mean": 301.848,
          "p50": 301.3729,
          "p95": 550.8832,
          "p99": 571.9877
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.036,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2823,
        "ttft": {
          "mean": 321.3303,
          "p50": 323.245,
          "p95": 581.9762,
          "p99": 606.2414
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 324.5053,
          "p50": 326.42,
          "p95": 585.1512,
          "p99": 609.4164
        },
        "waiting_time": {
          "mean": 321.1085,
          "p50": 323.0402,
          "p95": 581.816,
          "p99": 606.0468
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.037,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2827,
        "ttft": {
          "mean": 320.3413,
          "p50": 321.936,
          "p95": 581.5106,
          "p99": 602.9008
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 323.5163,
          "p50": 325.111,
          "p95": 584.6856,
          "p99": 606.0758
        },
        "waiting_time": {
          "mean": 320.1237,
          "p50": 321.7532,
          "p95": 581.3606,
          "p99": 602.731
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.031,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2826,
        "ttft": {
          "mean": 319.6626,
          "p50": 319.1639,
          "p95": 583.1339,
          "p99": 605.624
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 322.8376,
          "p50": 322.3389,
          "p95": 586.3089,
          "p99": 608.799
        },
        "waiting_time": {
          "mean": 319.4424,
          "p50": 318.9389,
          "p95": 582.9352,
          "p99": 605.3954
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.034,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 307.6039,
          "p50": 309.157,
          "p95": 557.2603,
          "p99": 580.5805
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 310.7789,
          "p50": 312.332,
          "p95": 560.4353,
          "p99": 583.7555
        },
        "waiting_time": {
          "mean": 307.5055,
          "p50": 309.0985,
          "p95": 557.1967,
          "p99": 580.5235
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.03,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 305.9337,
          "p50": 307.589,
          "p95": 555.3902,
          "p99": 576.075
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 309.1087,
          "p50": 310.764,
          "p95": 558.5652,
          "p99": 579.25
        },
        "waiting_time": {
          "mean": 305.8452,
          "p50": 307.5342,
          "p95": 555.3382,
          "p99": 575.8729
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.032,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 306.6385,
          "p50": 306.4837,
          "p95": 558.8356,
          "p99": 579.9466
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 309.8135,
          "p50": 309.6587,
          "p95": 562.0106,
          "p99": 583.1216
        },
        "waiting_time": {
          "mean": 306.5414,
          "p50": 306.4212,
          "p95": 558.7797,
          "p99": 579.8906
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.06,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2965,
        "ttft": {
          "mean": 11.6906,
          "p50": 11.6862,
          "p95": 20.2798,
          "p99": 20.8177
        },
        "tpot": {
          "mean": 4.5217,
          "p50": 4.5821,
          "p95": 4.6809,
          "p99": 4.6834
        },
        "e2e_latency": {
          "mean": 585.95,
          "p50": 596.5455,
          "p95": 605.7636,
          "p99": 606.4849
        },
        "waiting_time": {
          "mean": 0.0485,
          "p50": 0.0485,
          "p95": 0.0957,
          "p99": 0.0975
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.053,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2966,
        "ttft": {
          "mean": 11.7266,
          "p50": 11.721,
          "p95": 20.3238,
          "p99": 20.8761
        },
        "tpot": {
          "mean": 4.51,
          "p50": 4.5691,
          "p95": 4.6707,
          "p99": 4.6727
        },
        "e2e_latency": {
          "mean": 584.4904,
          "p50": 594.3733,
          "p95": 604.7132,
          "p99": 605.3244
        },
        "waiting_time": {
          "mean": 0.0529,
          "p50": 0.0539,
          "p95": 0.0954,
          "p99": 0.1039
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.047,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2968,
        "ttft": {
          "mean": 11.7227,
          "p50": 11.7642,
          "p95": 20.2781,
          "p99": 20.7873
        },
        "tpot": {
          "mean": 4.5064,
          "p50": 4.5656,
          "p95": 4.6643,
          "p99": 4.6736
        },
        "e2e_latency": {
          "mean": 584.0415,
          "p50": 593.7063,
          "p95": 604.3301,
          "p99": 604.8361
        },
        "waiting_time": {
          "mean": 0.049,
          "p50": 0.0466,
          "p95": 0.0944,
          "p99": 0.0989
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.052,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2823,
        "ttft": {
          "mean": 16.9981,
          "p50": 16.9877,
          "p95": 25.9608,
          "p99": 26.4788
        },
        "tpot": {
          "mean": 4.8487,
          "p50": 4.8691,
          "p95": 4.9759,
          "p99": 4.9814
        },
        "e2e_latency": {
          "mean": 632.777,
          "p50": 636.8116,
          "p95": 646.9058,
          "p99": 647.1939
        },
        "waiting_time": {
          "mean": 0.124,
          "p50": 0.0793,
          "p95": 0.3823,
          "p99": 0.5733
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.056,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2827,
        "ttft": {
          "mean": 16.482,
          "p50": 16.676,
          "p95": 25.5993,
          "p99": 25.9266
        },
        "tpot": {
          "mean": 4.8303,
          "p50": 4.8294,
          "p95": 4.9659,
          "p99": 4.9677
        },
        "e2e_latency": {
          "mean": 629.9344,
          "p50": 634.1952,
          "p95": 644.9002,
          "p99": 645.4499
        },
        "waiting_time": {
          "mean": 0.1017,
          "p50": 0.0737,
          "p95": 0.3033,
          "p99": 0.4185
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.05,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2826,
        "ttft": {
          "mean": 17.0871,
          "p50": 20.0938,
          "p95": 26.783,
          "p99": 27.2379
        },
        "tpot": {
          "mean": 4.8282,
          "p50": 4.8469,
          "p95": 4.9688,
          "p99": 4.9732
        },
        "e2e_latency": {
          "mean": 630.2625,
          "p50": 633.9553,
          "p95": 645.007,
          "p99": 645.9592
        },
        "waiting_time": {
          "mean": 0.1284,
          "p50": 0.08,
          "p95": 0.3366,
          "p99": 0.677
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 12.6428,
          "p50": 12.386,
          "p95": 20.677,
          "p99": 20.9159
        },
        "tpot": {
          "mean": 4.6017,
          "p50": 4.6538,
          "p95": 4.753,
          "p99": 4.7579
        },
        "e2e_latency": {
          "mean": 597.061,
          "p50": 604.961,
          "p95": 615.0021,
          "p99": 616.6248
        },
        "waiting_time": {
          "mean": 0.0665,
          "p50": 0.0574,
          "p95": 0.1855,
          "p99": 0.3015
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.049,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 12.3888,
          "p50": 12.2682,
          "p95": 20.8573,
          "p99": 21.0965
        },
        "tpot": {
          "mean": 4.5698,
          "p50": 4.6227,
          "p95": 4.7237,
          "p99": 4.7244
        },
        "e2e_latency": {
          "mean": 592.7474,
          "p50": 602.0486,
          "p95": 611.9627,
          "p99": 612.2004
        },
        "waiting_time": {
          "mean": 0.0552,
          "p50": 0.0483,
          "p95": 0.1096,
          "p99": 0.1706
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.056,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 12.5903,
          "p50": 12.8267,
          "p95": 20.4731,
          "p99": 20.9823
        },
        "tpot": {
          "mean": 4.5884,
          "p50": 4.6435,
          "p95": 4.7346,
          "p99": 4.7404
        },
        "e2e_latency": {
          "mean": 595.3115,
          "p50": 603.4207,
          "p95": 613.8519,
          "p99": 614.3308
        },
        "waiting_time": {
          "mean": 0.0614,
          "p50": 0.0575,
          "p95": 0.1295,
          "p99": 0.2378
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.059,
      "summary": {
        "count": 200,
        "throughput_rps": 0.295,
        "ttft": {
          "mean": 303.4147,
          "p50": 306.701,
          "p95": 554.1436,
          "p99": 576.1636
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.5897,
          "p50": 309.876,
          "p95": 557.3186,
          "p99": 579.3386
        },
        "waiting_time": {
          "mean": 303.3544,
          "p50": 306.6387,
          "p95": 554.0768,
          "p99": 576.0956
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.058,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2945,
        "ttft": {
          "mean": 302.9598,
          "p50": 302.4459,
          "p95": 556.2255,
          "p99": 575.927
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.1348,
          "p50": 305.6209,
          "p95": 559.4005,
          "p99": 579.102
        },
        "waiting_time": {
          "mean": 302.9001,
          "p50": 302.3882,
          "p95": 556.1605,
          "p99": 575.86
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.056,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2947,
        "ttft": {
          "mean": 301.9519,
          "p50": 297.2457,
          "p95": 555.4976,
          "p99": 578.5268
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 305.1269,
          "p50": 300.4207,
          "p95": 558.6726,
          "p99": 581.7018
        },
        "waiting_time": {
          "mean": 301.8917,
          "p50": 297.1847,
          "p95": 555.4343,
          "p99": 578.4578
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2809,
        "ttft": {
          "mean": 319.0508,
          "p50": 324.9306,
          "p95": 607.4281,
          "p99": 615.3142
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 322.2258,
          "p50": 328.1056,
          "p95": 610.6031,
          "p99": 618.4892
        },
        "waiting_time": {
          "mean": 318.8261,
          "p50": 324.7036,
          "p95": 607.1348,
          "p99": 615.0267
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.067,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2808,
        "ttft": {
          "mean": 318.192,
          "p50": 303.9902,
          "p95": 612.6363,
          "p99": 616.5622
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 321.367,
          "p50": 307.1652,
          "p95": 615.8113,
          "p99": 619.7372
        },
        "waiting_time": {
          "mean": 317.972,
          "p50": 303.7762,
          "p95": 612.3549,
          "p99": 616.2742
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.053,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2807,
        "ttft": {
          "mean": 317.6208,
          "p50": 315.4443,
          "p95": 604.6538,
          "p99": 617.7003
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 320.7958,
          "p50": 318.6193,
          "p95": 607.8288,
          "p99": 620.8753
        },
        "waiting_time": {
          "mean": 317.3973,
          "p50": 315.227,
          "p95": 604.3686,
          "p99": 617.4107
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.05,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2921,
        "ttft": {
          "mean": 304.257,
          "p50": 288.6159,
          "p95": 594.5998,
          "p99": 623.5598
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 307.432,
          "p50": 291.7909,
          "p95": 597.7748,
          "p99": 626.7348
        },
        "waiting_time": {
          "mean": 304.1566,
          "p50": 288.5619,
          "p95": 594.3443,
          "p99": 623.2872
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.046,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 303.6308,
          "p50": 288.0981,
          "p95": 587.7228,
          "p99": 633.2323
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.8058,
          "p50": 291.2731,
          "p95": 590.8978,
          "p99": 636.4073
        },
        "waiting_time": {
          "mean": 303.5409,
          "p50": 288.0368,
          "p95": 587.5046,
          "p99": 632.9608
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.045,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2914,
        "ttft": {
          "mean": 303.0214,
          "p50": 287.3575,
          "p95": 603.7506,
          "p99": 632.5341
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.1964,
          "p50": 290.5325,
          "p95": 606.9256,
          "p99": 635.7091
        },
        "waiting_time": {
          "mean": 302.9224,
          "p50": 287.301,
          "p95": 603.5087,
          "p99": 632.2585
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.288,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2965,
        "ttft": {
          "mean": 303.338,
          "p50": 305.1932,
          "p95": 549.6454,
          "p99": 572.571
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.513,
          "p50": 308.3682,
          "p95": 552.8204,
          "p99": 575.746
        },
        "waiting_time": {
          "mean": 303.278,
          "p50": 305.1355,
          "p95": 549.5936,
          "p99": 572.5145
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.315,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2966,
        "ttft": {
          "mean": 302.8829,
          "p50": 304.5087,
          "p95": 549.8226,
          "p99": 570.0284
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.0579,
          "p50": 307.6837,
          "p95": 552.9976,
          "p99": 573.2034
        },
        "waiting_time": {
          "mean": 302.8234,
          "p50": 304.4537,
          "p95": 549.7721,
          "p99": 569.9754
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "short",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.29,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2968,
        "ttft": {
          "mean": 301.9078,
          "p50": 301.4334,
          "p95": 550.9399,
          "p99": 572.0487
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 305.0828,
          "p50": 304.6084,
          "p95": 554.1149,
          "p99": 575.2237
        },
        "waiting_time": {
          "mean": 301.848,
          "p50": 301.3729,
          "p95": 550.8832,
          "p99": 571.9877
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "short"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.376,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2741,
        "ttft": {
          "mean": 332.5129,
          "p50": 334.455,
          "p95": 602.0402,
          "p99": 627.1426
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 335.6879,
          "p50": 337.63,
          "p95": 605.2152,
          "p99": 630.3176
        },
        "waiting_time": {
          "mean": 332.1908,
          "p50": 334.1602,
          "p95": 601.819,
          "p99": 626.8676
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.374,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2746,
        "ttft": {
          "mean": 331.2202,
          "p50": 332.806,
          "p95": 601.2736,
          "p99": 623.3816
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 334.3952,
          "p50": 335.981,
          "p95": 604.4486,
          "p99": 626.5566
        },
        "waiting_time": {
          "mean": 330.904,
          "p50": 332.5432,
          "p95": 601.0636,
          "p99": 623.1516
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "long",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.356,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2744,
        "ttft": {
          "mean": 330.652,
          "p50": 330.1239,
          "p95": 603.0989,
          "p99": 626.4452
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 333.827,
          "p50": 333.2989,
          "p95": 606.2739,
          "p99": 629.6202
        },
        "waiting_time": {
          "mean": 330.3323,
          "p50": 329.7889,
          "p95": 602.8192,
          "p99": 626.1164
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "long"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.342,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2909,
        "ttft": {
          "mean": 310.257,
          "p50": 311.637,
          "p95": 561.9803,
          "p99": 585.5605
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 313.432,
          "p50": 314.812,
          "p95": 565.1553,
          "p99": 588.7355
        },
        "waiting_time": {
          "mean": 310.1347,
          "p50": 311.5785,
          "p95": 561.9167,
          "p99": 585.5035
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.321,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2924,
        "ttft": {
          "mean": 307.7963,
          "p50": 309.469,
          "p95": 558.8302,
          "p99": 579.775
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 310.9713,
          "p50": 312.644,
          "p95": 562.0052,
          "p99": 582.95
        },
        "waiting_time": {
          "mean": 307.6899,
          "p50": 309.4142,
          "p95": 558.7782,
          "p99": 579.4937
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.324,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2912,
        "ttft": {
          "mean": 309.5962,
          "p50": 309.6237,
          "p95": 563.7756,
          "p99": 584.8872
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 312.7712,
          "p50": 312.7987,
          "p95": 566.9506,
          "p99": 588.0622
        },
        "waiting_time": {
          "mean": 309.4759,
          "p50": 309.5612,
          "p95": 563.7197,
          "p99": 584.8306
        }
      },
      "experiment": "E2_prompt_mix",
      "variable": "prompt_distribution",
      "variable_value": "bimodal"
    }
  ],
  "E3_output_length": [
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.009,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1166,
        "ttft": {
          "mean": 45.4705,
          "p50": 47.0235,
          "p95": 80.525,
          "p99": 84.4231
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 46.2455,
          "p50": 47.7985,
          "p95": 81.3,
          "p99": 85.1981
        },
        "waiting_time": {
          "mean": 45.372,
          "p50": 46.965,
          "p95": 80.4602,
          "p99": 84.366
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.011,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1342,
        "ttft": {
          "mean": 43.1337,
          "p50": 44.789,
          "p95": 77.2758,
          "p99": 79.251
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 43.9087,
          "p50": 45.564,
          "p95": 78.0508,
          "p99": 80.026
        },
        "waiting_time": {
          "mean": 43.0452,
          "p50": 44.7342,
          "p95": 77.2023,
          "p99": 79.1438
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.011,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1243,
        "ttft": {
          "mean": 43.8385,
          "p50": 43.6837,
          "p95": 81.1156,
          "p99": 83.1226
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 44.6135,
          "p50": 44.4587,
          "p95": 81.8906,
          "p99": 83.8976
        },
        "waiting_time": {
          "mean": 43.7414,
          "p50": 43.6212,
          "p95": 81.0597,
          "p99": 83.0666
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.034,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 307.6039,
          "p50": 309.157,
          "p95": 557.2603,
          "p99": 580.5805
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 310.7789,
          "p50": 312.332,
          "p95": 560.4353,
          "p99": 583.7555
        },
        "waiting_time": {
          "mean": 307.5055,
          "p50": 309.0985,
          "p95": 557.1967,
          "p99": 580.5235
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.035,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 305.9337,
          "p50": 307.589,
          "p95": 555.3902,
          "p99": 576.075
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 309.1087,
          "p50": 310.764,
          "p95": 558.5652,
          "p99": 579.25
        },
        "waiting_time": {
          "mean": 305.8452,
          "p50": 307.5342,
          "p95": 555.3382,
          "p99": 575.8729
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.037,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 306.6385,
          "p50": 306.4837,
          "p95": 558.8356,
          "p99": 579.9466
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 309.8135,
          "p50": 309.6587,
          "p95": 562.0106,
          "p99": 583.1216
        },
        "waiting_time": {
          "mean": 306.5414,
          "p50": 306.4212,
          "p95": 558.7797,
          "p99": 579.8906
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.143,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0741,
        "ttft": {
          "mean": 1358.8039,
          "p50": 1360.357,
          "p95": 2468.1403,
          "p99": 2567.8765
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1371.5789,
          "p50": 1373.132,
          "p95": 2480.9153,
          "p99": 2580.6515
        },
        "waiting_time": {
          "mean": 1358.7055,
          "p50": 1360.2985,
          "p95": 2468.0767,
          "p99": 2567.8195
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.163,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0742,
        "ttft": {
          "mean": 1357.1337,
          "p50": 1358.789,
          "p95": 2466.2702,
          "p99": 2563.371
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1369.9087,
          "p50": 1371.564,
          "p95": 2479.0452,
          "p99": 2576.146
        },
        "waiting_time": {
          "mean": 1357.0452,
          "p50": 1358.7342,
          "p95": 2466.2182,
          "p99": 2563.1689
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "fcfs",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.141,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0741,
        "ttft": {
          "mean": 1357.8385,
          "p50": 1357.6837,
          "p95": 2469.7156,
          "p99": 2567.2426
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1370.6135,
          "p50": 1370.4587,
          "p95": 2482.4906,
          "p99": 2580.0176
        },
        "waiting_time": {
          "mean": 1357.7414,
          "p50": 1357.6212,
          "p95": 2469.6597,
          "p99": 2567.1866
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.021,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1166,
        "ttft": {
          "mean": 9.8102,
          "p50": 9.537,
          "p95": 15.702,
          "p99": 15.8944
        },
        "tpot": {
          "mean": 2.5568,
          "p50": 2.7833,
          "p95": 3.1576,
          "p99": 3.1748
        },
        "e2e_latency": {
          "mean": 89.071,
          "p50": 99.4727,
          "p95": 108.0397,
          "p99": 108.6267
        },
        "waiting_time": {
          "mean": 0.062,
          "p50": 0.0518,
          "p95": 0.1743,
          "p99": 0.278
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.018,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1342,
        "ttft": {
          "mean": 9.3495,
          "p50": 9.7272,
          "p95": 15.5304,
          "p99": 15.7661
        },
        "tpot": {
          "mean": 2.4016,
          "p50": 2.6174,
          "p95": 2.9918,
          "p99": 3.0077
        },
        "e2e_latency": {
          "mean": 83.7994,
          "p50": 92.2128,
          "p95": 102.763,
          "p99": 103.1343
        },
        "waiting_time": {
          "mean": 0.0552,
          "p50": 0.0483,
          "p95": 0.1096,
          "p99": 0.1706
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.018,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1243,
        "ttft": {
          "mean": 9.4536,
          "p50": 10.0825,
          "p95": 15.3567,
          "p99": 15.5823
        },
        "tpot": {
          "mean": 2.4558,
          "p50": 2.6627,
          "p95": 3.0644,
          "p99": 3.0859
        },
        "e2e_latency": {
          "mean": 85.5849,
          "p50": 95.3069,
          "p95": 105.3588,
          "p99": 106.1442
        },
        "waiting_time": {
          "mean": 0.0614,
          "p50": 0.0575,
          "p95": 0.1295,
          "p99": 0.2378
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.05,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 12.6428,
          "p50": 12.386,
          "p95": 20.677,
          "p99": 20.9159
        },
        "tpot": {
          "mean": 4.6017,
          "p50": 4.6538,
          "p95": 4.753,
          "p99": 4.7579
        },
        "e2e_latency": {
          "mean": 597.061,
          "p50": 604.961,
          "p95": 615.0021,
          "p99": 616.6248
        },
        "waiting_time": {
          "mean": 0.0665,
          "p50": 0.0574,
          "p95": 0.1855,
          "p99": 0.3015
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.052,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 12.3888,
          "p50": 12.2682,
          "p95": 20.8573,
          "p99": 21.0965
        },
        "tpot": {
          "mean": 4.5698,
          "p50": 4.6227,
          "p95": 4.7237,
          "p99": 4.7244
        },
        "e2e_latency": {
          "mean": 592.7474,
          "p50": 602.0486,
          "p95": 611.9627,
          "p99": 612.2004
        },
        "waiting_time": {
          "mean": 0.0552,
          "p50": 0.0483,
          "p95": 0.1096,
          "p99": 0.1706
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.053,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 12.5903,
          "p50": 12.8267,
          "p95": 20.4731,
          "p99": 20.9823
        },
        "tpot": {
          "mean": 4.5884,
          "p50": 4.6435,
          "p95": 4.7346,
          "p99": 4.7404
        },
        "e2e_latency": {
          "mean": 595.3115,
          "p50": 603.4207,
          "p95": 613.8519,
          "p99": 614.3308
        },
        "waiting_time": {
          "mean": 0.0614,
          "p50": 0.0575,
          "p95": 0.1295,
          "p99": 0.2378
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.166,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0741,
        "ttft": {
          "mean": 12.7195,
          "p50": 12.486,
          "p95": 20.777,
          "p99": 21.0159
        },
        "tpot": {
          "mean": 5.089,
          "p50": 5.1016,
          "p95": 5.1269,
          "p99": 5.1279
        },
        "e2e_latency": {
          "mean": 2613.1805,
          "p50": 2620.9626,
          "p95": 2631.2885,
          "p99": 2632.6646
        },
        "waiting_time": {
          "mean": 0.0665,
          "p50": 0.0574,
          "p95": 0.1855,
          "p99": 0.3015
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.203,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0742,
        "ttft": {
          "mean": 12.3888,
          "p50": 12.2682,
          "p95": 20.8573,
          "p99": 21.0965
        },
        "tpot": {
          "mean": 5.0809,
          "p50": 5.0941,
          "p95": 5.1192,
          "p99": 5.1194
        },
        "e2e_latency": {
          "mean": 2608.7474,
          "p50": 2618.0486,
          "p95": 2627.9627,
          "p99": 2628.2004
        },
        "waiting_time": {
          "mean": 0.0552,
          "p50": 0.0483,
          "p95": 0.1096,
          "p99": 0.1706
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.219,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0741,
        "ttft": {
          "mean": 12.5903,
          "p50": 12.8267,
          "p95": 20.4731,
          "p99": 20.9823
        },
        "tpot": {
          "mean": 5.0856,
          "p50": 5.0993,
          "p95": 5.1219,
          "p99": 5.1234
        },
        "e2e_latency": {
          "mean": 2611.3115,
          "p50": 2619.4207,
          "p95": 2629.8519,
          "p99": 2630.3308
        },
        "waiting_time": {
          "mean": 0.0614,
          "p50": 0.0575,
          "p95": 0.1295,
          "p99": 0.2378
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.018,
      "summary": {
        "count": 200,
        "throughput_rps": 1.103,
        "ttft": {
          "mean": 41.9567,
          "p50": 27.7736,
          "p95": 135.4828,
          "p99": 157.1679
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 42.7317,
          "p50": 28.5486,
          "p95": 136.2578,
          "p99": 157.9429
        },
        "waiting_time": {
          "mean": 41.8566,
          "p50": 27.7126,
          "p95": 135.2323,
          "p99": 156.8865
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.016,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1115,
        "ttft": {
          "mean": 40.6193,
          "p50": 32.3526,
          "p95": 130.1865,
          "p99": 147.4643
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 41.3943,
          "p50": 33.1276,
          "p95": 130.9615,
          "p99": 148.2393
        },
        "waiting_time": {
          "mean": 40.5297,
          "p50": 32.2879,
          "p95": 129.9585,
          "p99": 147.2626
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.02,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1176,
        "ttft": {
          "mean": 40.2785,
          "p50": 23.2829,
          "p95": 132.1931,
          "p99": 150.1076
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 41.0535,
          "p50": 24.0579,
          "p95": 132.9681,
          "p99": 150.8826
        },
        "waiting_time": {
          "mean": 40.1805,
          "p50": 23.2239,
          "p95": 131.998,
          "p99": 149.8325
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.046,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2921,
        "ttft": {
          "mean": 304.257,
          "p50": 288.6159,
          "p95": 594.5998,
          "p99": 623.5598
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 307.432,
          "p50": 291.7909,
          "p95": 597.7748,
          "p99": 626.7348
        },
        "waiting_time": {
          "mean": 304.1566,
          "p50": 288.5619,
          "p95": 594.3443,
          "p99": 623.2872
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.046,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 303.6308,
          "p50": 288.0981,
          "p95": 587.7228,
          "p99": 633.2323
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.8058,
          "p50": 291.2731,
          "p95": 590.8978,
          "p99": 636.4073
        },
        "waiting_time": {
          "mean": 303.5409,
          "p50": 288.0368,
          "p95": 587.5046,
          "p99": 632.9608
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.047,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2914,
        "ttft": {
          "mean": 303.0214,
          "p50": 287.3575,
          "p95": 603.7506,
          "p99": 632.5341
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 306.1964,
          "p50": 290.5325,
          "p95": 606.9256,
          "p99": 635.7091
        },
        "waiting_time": {
          "mean": 302.9224,
          "p50": 287.301,
          "p95": 603.5087,
          "p99": 632.2585
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.298,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0741,
        "ttft": {
          "mean": 1355.457,
          "p50": 1339.3709,
          "p95": 2509.2071,
          "p99": 2583.4472
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1368.232,
          "p50": 1352.1459,
          "p95": 2521.9821,
          "p99": 2596.2222
        },
        "waiting_time": {
          "mean": 1355.3566,
          "p50": 1339.3081,
          "p95": 2508.9256,
          "p99": 2583.1547
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.4,
      "summary": {
        "count": 200,
        "throughput_rps": 0.074,
        "ttft": {
          "mean": 1354.8308,
          "p50": 1338.3963,
          "p95": 2500.728,
          "p99": 2593.5267
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1367.6058,
          "p50": 1351.1713,
          "p95": 2513.503,
          "p99": 2606.3017
        },
        "waiting_time": {
          "mean": 1354.7409,
          "p50": 1338.3401,
          "p95": 2500.4895,
          "p99": 2593.2457
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "spf",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.401,
      "summary": {
        "count": 200,
        "throughput_rps": 0.074,
        "ttft": {
          "mean": 1354.3087,
          "p50": 1345.0247,
          "p95": 2516.6345,
          "p99": 2612.8565
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1367.0837,
          "p50": 1357.7997,
          "p95": 2529.4095,
          "p99": 2625.6315
        },
        "waiting_time": {
          "mean": 1354.2096,
          "p50": 1344.9607,
          "p95": 2516.3844,
          "p99": 2612.5699
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.153,
      "summary": {
        "count": 200,
        "throughput_rps": 1.0864,
        "ttft": {
          "mean": 48.1236,
          "p50": 49.5035,
          "p95": 85.245,
          "p99": 89.4031
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 48.8986,
          "p50": 50.2785,
          "p95": 86.02,
          "p99": 90.1781
        },
        "waiting_time": {
          "mean": 48.0012,
          "p50": 49.445,
          "p95": 85.1802,
          "p99": 89.346
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.171,
      "summary": {
        "count": 200,
        "throughput_rps": 1.1109,
        "ttft": {
          "mean": 44.9963,
          "p50": 46.669,
          "p95": 80.7188,
          "p99": 82.951
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 45.7713,
          "p50": 47.444,
          "p95": 81.4938,
          "p99": 83.726
        },
        "waiting_time": {
          "mean": 44.8899,
          "p50": 46.6142,
          "p95": 80.6423,
          "p99": 82.6697
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 32,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.156,
      "summary": {
        "count": 200,
        "throughput_rps": 1.0935,
        "ttft": {
          "mean": 46.7962,
          "p50": 46.8237,
          "p95": 86.0556,
          "p99": 88.0632
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 47.5712,
          "p50": 47.5987,
          "p95": 86.8306,
          "p99": 88.8382
        },
        "waiting_time": {
          "mean": 46.6759,
          "p50": 46.7612,
          "p95": 85.9997,
          "p99": 88.0066
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 32
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.916,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2909,
        "ttft": {
          "mean": 310.257,
          "p50": 311.637,
          "p95": 561.9803,
          "p99": 585.5605
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 313.432,
          "p50": 314.812,
          "p95": 565.1553,
          "p99": 588.7355
        },
        "waiting_time": {
          "mean": 310.1347,
          "p50": 311.5785,
          "p95": 561.9167,
          "p99": 585.5035
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.969,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2924,
        "ttft": {
          "mean": 307.7963,
          "p50": 309.469,
          "p95": 558.8302,
          "p99": 579.775
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 310.9713,
          "p50": 312.644,
          "p95": 562.0052,
          "p99": 582.95
        },
        "waiting_time": {
          "mean": 307.6899,
          "p50": 309.4142,
          "p95": 558.7782,
          "p99": 579.4937
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.806,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2912,
        "ttft": {
          "mean": 309.5962,
          "p50": 309.6237,
          "p95": 563.7756,
          "p99": 584.8872
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 312.7712,
          "p50": 312.7987,
          "p95": 566.9506,
          "p99": 588.0622
        },
        "waiting_time": {
          "mean": 309.4759,
          "p50": 309.5612,
          "p95": 563.7197,
          "p99": 584.8306
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 128
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 3.491,
      "summary": {
        "count": 200,
        "throughput_rps": 0.074,
        "ttft": {
          "mean": 1361.457,
          "p50": 1362.837,
          "p95": 2472.8603,
          "p99": 2572.8565
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1374.232,
          "p50": 1375.612,
          "p95": 2485.6353,
          "p99": 2585.6315
        },
        "waiting_time": {
          "mean": 1361.3347,
          "p50": 1362.7785,
          "p95": 2472.7967,
          "p99": 2572.7995
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 1.582,
      "summary": {
        "count": 200,
        "throughput_rps": 0.0741,
        "ttft": {
          "mean": 1358.9963,
          "p50": 1360.669,
          "p95": 2469.7102,
          "p99": 2567.071
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1371.7713,
          "p50": 1373.444,
          "p95": 2482.4852,
          "p99": 2579.846
        },
        "waiting_time": {
          "mean": 1358.8899,
          "p50": 1360.6142,
          "p95": 2469.6582,
          "p99": 2566.7897
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    },
    {
      "policy": "decode_first",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 512,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 1.446,
      "summary": {
        "count": 200,
        "throughput_rps": 0.074,
        "ttft": {
          "mean": 1360.7962,
          "p50": 1360.8237,
          "p95": 2474.6556,
          "p99": 2572.1832
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 1373.5712,
          "p50": 1373.5987,
          "p95": 2487.4306,
          "p99": 2584.9582
        },
        "waiting_time": {
          "mean": 1360.6759,
          "p50": 1360.7612,
          "p95": 2474.5997,
          "p99": 2572.1266
        }
      },
      "experiment": "E3_output_length",
      "variable": "max_output_tokens",
      "variable_value": 512
    }
  ],
  "E4_rr_quantum": [
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.063,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 3.3167,
          "p50": 3.1087,
          "p95": 5.5414,
          "p99": 5.7766
        },
        "tpot": {
          "mean": 4.7285,
          "p50": 4.7803,
          "p95": 4.8664,
          "p99": 4.8674
        },
        "e2e_latency": {
          "mean": 603.8311,
          "p50": 610.6116,
          "p95": 621.0575,
          "p99": 621.2201
        },
        "waiting_time": {
          "mean": 0.0283,
          "p50": 0.0148,
          "p95": 0.15,
          "p99": 0.251
        }
      },
      "rr_quantum": 1,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 1
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.065,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 3.2332,
          "p50": 3.3042,
          "p95": 5.5354,
          "p99": 5.8298
        },
        "tpot": {
          "mean": 4.6947,
          "p50": 4.7452,
          "p95": 4.8395,
          "p99": 4.8406
        },
        "e2e_latency": {
          "mean": 599.4543,
          "p50": 605.9222,
          "p95": 617.6632,
          "p99": 617.8902
        },
        "waiting_time": {
          "mean": 0.0194,
          "p50": 0.0137,
          "p95": 0.0472,
          "p99": 0.1615
        }
      },
      "rr_quantum": 1,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 1
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.062,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 3.3169,
          "p50": 3.409,
          "p95": 5.4279,
          "p99": 5.4891
        },
        "tpot": {
          "mean": 4.7138,
          "p50": 4.764,
          "p95": 4.8529,
          "p99": 4.8547
        },
        "e2e_latency": {
          "mean": 601.9742,
          "p50": 607.609,
          "p95": 619.3593,
          "p99": 619.7221
        },
        "waiting_time": {
          "mean": 0.0216,
          "p50": 0.0124,
          "p95": 0.0659,
          "p99": 0.1876
        }
      },
      "rr_quantum": 1,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 1
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.059,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 12.6428,
          "p50": 12.386,
          "p95": 20.677,
          "p99": 20.9159
        },
        "tpot": {
          "mean": 4.6017,
          "p50": 4.6538,
          "p95": 4.753,
          "p99": 4.7579
        },
        "e2e_latency": {
          "mean": 597.061,
          "p50": 604.961,
          "p95": 615.0021,
          "p99": 616.6248
        },
        "waiting_time": {
          "mean": 0.0665,
          "p50": 0.0574,
          "p95": 0.1855,
          "p99": 0.3015
        }
      },
      "rr_quantum": 4,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 4
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.059,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 12.3888,
          "p50": 12.2682,
          "p95": 20.8573,
          "p99": 21.0965
        },
        "tpot": {
          "mean": 4.5698,
          "p50": 4.6227,
          "p95": 4.7237,
          "p99": 4.7244
        },
        "e2e_latency": {
          "mean": 592.7474,
          "p50": 602.0486,
          "p95": 611.9627,
          "p99": 612.2004
        },
        "waiting_time": {
          "mean": 0.0552,
          "p50": 0.0483,
          "p95": 0.1096,
          "p99": 0.1706
        }
      },
      "rr_quantum": 4,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 4
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 12.5903,
          "p50": 12.8267,
          "p95": 20.4731,
          "p99": 20.9823
        },
        "tpot": {
          "mean": 4.5884,
          "p50": 4.6435,
          "p95": 4.7346,
          "p99": 4.7404
        },
        "e2e_latency": {
          "mean": 595.3115,
          "p50": 603.4207,
          "p95": 613.8519,
          "p99": 614.3308
        },
        "waiting_time": {
          "mean": 0.0614,
          "p50": 0.0575,
          "p95": 0.1295,
          "p99": 0.2378
        }
      },
      "rr_quantum": 4,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 4
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.06,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 47.6616,
          "p50": 51.264,
          "p95": 80.2908,
          "p99": 82.7648
        },
        "tpot": {
          "mean": 4.1056,
          "p50": 4.1699,
          "p95": 4.3018,
          "p99": 4.3116
        },
        "e2e_latency": {
          "mean": 569.071,
          "p50": 590.7556,
          "p95": 596.8164,
          "p99": 598.3268
        },
        "waiting_time": {
          "mean": 0.2175,
          "p50": 0.2038,
          "p95": 0.3864,
          "p99": 0.5583
        }
      },
      "rr_quantum": 16,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 16
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.055,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 47.3986,
          "p50": 50.2635,
          "p95": 80.4573,
          "p99": 82.9166
        },
        "tpot": {
          "mean": 4.0798,
          "p50": 4.1368,
          "p95": 4.2833,
          "p99": 4.2927
        },
        "e2e_latency": {
          "mean": 565.5299,
          "p50": 586.5533,
          "p95": 594.4648,
          "p99": 596.0658
        },
        "waiting_time": {
          "mean": 0.2132,
          "p50": 0.2284,
          "p95": 0.3921,
          "p99": 0.4437
        }
      },
      "rr_quantum": 16,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 16
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.053,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 47.5183,
          "p50": 50.1192,
          "p95": 79.9931,
          "p99": 82.8843
        },
        "tpot": {
          "mean": 4.0971,
          "p50": 4.1698,
          "p95": 4.29,
          "p99": 4.3005
        },
        "e2e_latency": {
          "mean": 567.852,
          "p50": 589.5179,
          "p95": 594.5716,
          "p99": 595.1102
        },
        "waiting_time": {
          "mean": 0.2134,
          "p50": 0.2193,
          "p95": 0.3848,
          "p99": 0.4116
        }
      },
      "rr_quantum": 16,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 16
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.065,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2931,
        "ttft": {
          "mean": 175.0828,
          "p50": 176.664,
          "p95": 306.8108,
          "p99": 319.8337
        },
        "tpot": {
          "mean": 2.2072,
          "p50": 2.2864,
          "p95": 2.5195,
          "p99": 2.5447
        },
        "e2e_latency": {
          "mean": 455.393,
          "p50": 479.039,
          "p95": 577.1058,
          "p99": 587.0087
        },
        "waiting_time": {
          "mean": 0.8255,
          "p50": 0.7572,
          "p95": 1.5069,
          "p99": 1.7221
        }
      },
      "rr_quantum": 64,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 64
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.052,
      "summary": {
        "count": 200,
        "throughput_rps": 0.294,
        "ttft": {
          "mean": 174.194,
          "p50": 173.9857,
          "p95": 308.1173,
          "p99": 318.5246
        },
        "tpot": {
          "mean": 2.183,
          "p50": 2.2675,
          "p95": 2.5195,
          "p99": 2.5321
        },
        "e2e_latency": {
          "mean": 451.4339,
          "p50": 476.3607,
          "p95": 575.2923,
          "p99": 582.4996
        },
        "waiting_time": {
          "mean": 0.8932,
          "p50": 0.9241,
          "p95": 1.5411,
          "p99": 1.5964
        }
      },
      "rr_quantum": 64,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 64
    },
    {
      "policy": "round_robin",
      "arrival_rate": 2.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.049,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2933,
        "ttft": {
          "mean": 173.799,
          "p50": 174.5192,
          "p95": 304.8931,
          "p99": 317.6923
        },
        "tpot": {
          "mean": 2.2075,
          "p50": 2.2927,
          "p95": 2.5195,
          "p99": 2.5322
        },
        "e2e_latency": {
          "mean": 454.148,
          "p50": 475.2942,
          "p95": 578.3881,
          "p99": 586.4673
        },
        "waiting_time": {
          "mean": 0.8854,
          "p50": 0.9311,
          "p95": 1.519,
          "p99": 1.5849
        }
      },
      "rr_quantum": 64,
      "experiment": "E4_rr_quantum",
      "variable": "rr_quantum",
      "variable_value": 64
    }
  ],
  "E5_burst_arrival": [
    {
      "policy": "fcfs",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.051,
      "summary": {
        "count": 200,
        "throughput_rps": 0.291,
        "ttft": {
          "mean": 333.5294,
          "p50": 333.2332,
          "p95": 604.7634,
          "p99": 627.6912
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 336.7044,
          "p50": 336.4082,
          "p95": 607.9384,
          "p99": 630.8662
        },
        "waiting_time": {
          "mean": 333.4309,
          "p50": 333.1747,
          "p95": 604.698,
          "p99": 627.6342
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "fcfs",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.031,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 332.2363,
          "p50": 332.2605,
          "p95": 602.6082,
          "p99": 625.6053
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 335.4113,
          "p50": 335.4355,
          "p95": 605.7832,
          "p99": 628.7803
        },
        "waiting_time": {
          "mean": 332.1478,
          "p50": 332.2057,
          "p95": 602.5548,
          "p99": 625.4032
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "fcfs",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.034,
      "summary": {
        "count": 200,
        "throughput_rps": 0.291,
        "ttft": {
          "mean": 333.9569,
          "p50": 334.2723,
          "p95": 605.0146,
          "p99": 627.5537
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 337.1319,
          "p50": 337.4473,
          "p95": 608.1896,
          "p99": 630.7287
        },
        "waiting_time": {
          "mean": 333.8598,
          "p50": 334.2098,
          "p95": 604.9515,
          "p99": 627.4978
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "round_robin",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.052,
      "summary": {
        "count": 200,
        "throughput_rps": 0.291,
        "ttft": {
          "mean": 14.5483,
          "p50": 17.1887,
          "p95": 21.3102,
          "p99": 21.6025
        },
        "tpot": {
          "mean": 4.918,
          "p50": 4.9396,
          "p95": 5.0036,
          "p99": 5.0036
        },
        "e2e_latency": {
          "mean": 639.1385,
          "p50": 643.1831,
          "p95": 649.3215,
          "p99": 650.0793
        },
        "waiting_time": {
          "mean": 0.6709,
          "p50": 0.5776,
          "p95": 1.4768,
          "p99": 1.7391
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "round_robin",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.063,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 14.0782,
          "p50": 16.3557,
          "p95": 21.3422,
          "p99": 21.7095
        },
        "tpot": {
          "mean": 4.897,
          "p50": 4.9277,
          "p95": 4.9867,
          "p99": 4.9867
        },
        "e2e_latency": {
          "mean": 636.0025,
          "p50": 640.8102,
          "p95": 647.2376,
          "p99": 648.0003
        },
        "waiting_time": {
          "mean": 0.6278,
          "p50": 0.5766,
          "p95": 1.368,
          "p99": 1.7978
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "round_robin",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.056,
      "summary": {
        "count": 200,
        "throughput_rps": 0.291,
        "ttft": {
          "mean": 14.4491,
          "p50": 16.9083,
          "p95": 20.9911,
          "p99": 21.3634
        },
        "tpot": {
          "mean": 4.9209,
          "p50": 4.942,
          "p95": 4.997,
          "p99": 4.997
        },
        "e2e_latency": {
          "mean": 639.4024,
          "p50": 643.6189,
          "p95": 649.2913,
          "p99": 650.0519
        },
        "waiting_time": {
          "mean": 0.6898,
          "p50": 0.6922,
          "p95": 1.4575,
          "p99": 1.64
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "spf",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.053,
      "summary": {
        "count": 200,
        "throughput_rps": 0.291,
        "ttft": {
          "mean": 330.0373,
          "p50": 323.1153,
          "p95": 625.0682,
          "p99": 645.2508
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 333.2123,
          "p50": 326.2903,
          "p95": 628.2432,
          "p99": 648.4258
        },
        "waiting_time": {
          "mean": 329.9369,
          "p50": 323.0546,
          "p95": 624.797,
          "p99": 644.9638
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "spf",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.042,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2919,
        "ttft": {
          "mean": 329.7904,
          "p50": 323.4469,
          "p95": 620.8933,
          "p99": 644.561
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 332.9654,
          "p50": 326.6219,
          "p95": 624.0683,
          "p99": 647.736
        },
        "waiting_time": {
          "mean": 329.7004,
          "p50": 323.3836,
          "p95": 620.661,
          "p99": 644.2894
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "spf",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.046,
      "summary": {
        "count": 200,
        "throughput_rps": 0.291,
        "ttft": {
          "mean": 330.2499,
          "p50": 320.1157,
          "p95": 627.6887,
          "p99": 653.0231
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 333.4249,
          "p50": 323.2907,
          "p95": 630.8637,
          "p99": 656.1981
        },
        "waiting_time": {
          "mean": 330.1508,
          "p50": 320.0552,
          "p95": 627.4468,
          "p99": 652.7529
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "decode_first",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 42,
      "wall_time_seconds": 0.347,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2889,
        "ttft": {
          "mean": 336.1825,
          "p50": 335.7132,
          "p95": 609.4834,
          "p99": 632.6712
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 339.3575,
          "p50": 338.8882,
          "p95": 612.6584,
          "p99": 635.8462
        },
        "waiting_time": {
          "mean": 336.0601,
          "p50": 335.6547,
          "p95": 609.418,
          "p99": 632.6142
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "decode_first",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 123,
      "wall_time_seconds": 0.324,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2903,
        "ttft": {
          "mean": 334.0989,
          "p50": 334.1405,
          "p95": 606.0482,
          "p99": 629.3053
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 337.2739,
          "p50": 337.3155,
          "p95": 609.2232,
          "p99": 632.4803
        },
        "waiting_time": {
          "mean": 333.9925,
          "p50": 334.0857,
          "p95": 605.9948,
          "p99": 629.024
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    },
    {
      "policy": "decode_first",
      "arrival_rate": 8.0,
      "prompt_distribution": "bimodal",
      "output_distribution": "fixed",
      "max_output_tokens": 128,
      "total_requests": 200,
      "warmup_requests": 10,
      "seed": 7,
      "wall_time_seconds": 0.305,
      "summary": {
        "count": 200,
        "throughput_rps": 0.2889,
        "ttft": {
          "mean": 336.9146,
          "p50": 337.4123,
          "p95": 609.9546,
          "p99": 632.4943
        },
        "tpot": {
          "mean": 0.025,
          "p50": 0.025,
          "p95": 0.025,
          "p99": 0.025
        },
        "e2e_latency": {
          "mean": 340.0896,
          "p50": 340.5873,
          "p95": 613.1296,
          "p99": 635.6693
        },
        "waiting_time": {
          "mean": 336.7943,
          "p50": 337.3498,
          "p95": 609.8915,
          "p99": 632.4378
        }
      },
      "experiment": "E5_burst_arrival",
      "variable": null,
      "variable_value": null
    }
  ]
};
export const TOTAL_REQUESTS_SIMULATED = 31200;
