#!/bin/bash
cd "$(dirname "$0")"
(STYLE=lofi DUR=19 OUT=lofi19.wav python3 groove.py > g5.log 2>&1) &
(STYLE=afro DUR=17 OUT=afro17.wav python3 groove.py > g6.log 2>&1) &
for n in 11 15 16 17; do
  node render.js v full scene$n > r$n.log 2>&1 || { echo FAIL render $n > run_status.txt; exit 1; }
  case $n in 11) D=19;; 15) D=16.5;; 16) D=20;; 17) D=16.6;; esac
  EV=events$n.json DUR=$D OUT=sfx_n$n.wav CFG=1 python3 synth.py > syn$n.log 2>&1 || { echo FAIL synth $n > run_status.txt; exit 1; }
done
wait
echo RENDERED > run_status.txt
