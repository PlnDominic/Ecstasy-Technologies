import subprocess, os
V = 'social-studio/video'; VO = '../tts/vo'
JOBS = [
 ('s11', 'social-media/w47-sleek-code', 18, 'lofi18.wav', 'sfx2.wav', 0.30, [('sc1',0.5),('sc2',4.3),('sc3',9.5),('sc4',14.7)]),
 ('s15', 'social-media/w47-sleek-addtobag', 15, 'afro15.wav', 'sfx15.wav', 0.26, [('sb1',0.2),('sb2',1.9),('sb3',5.6),('sb4',8.1),('sb5',10.9),('sb6',12.8)]),
 ('s16', 'social-media/w47-mave-type', 20, 'afro20.wav', 'sfx16.wav', 0.26, [('m1a',0.6),('m1b',3.8),('m1c',7.4),('m1d',11.0),('m1e',14.5),('m1f',16.9)]),
 ('s17', 'social-media/w47-mave-arches', 16, 'music4.wav', 'sfx17.wav', 0.34, [('m2a',0.5),('m2b',3.3),('m2c',8.9),('m2d',13.3)]),
]
for fr, out, dur, music, sfx, mvol, lines in JOBS:
    os.makedirs(out, exist_ok=True)
    cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-framerate', '30', '-i', f'{V}/{fr}-frames-v/%05d.png', '-i', f'{V}/{music}', '-i', f'{V}/{sfx}']
    for k, _ in lines: cmd += ['-i', f'{VO}/{k}.wav']
    fc = []; labels = ''
    for i, (k, t) in enumerate(lines):
        fc.append(f'[{i+3}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={int(t*1000)}|{int(t*1000)},volume=1.25[v{i}]'); labels += f'[v{i}]'
    fc.append(f'{labels}amix=inputs={len(lines)}:duration=longest:normalize=0[vo]')
    fc.append(f'[1:a]volume={mvol},afade=t=out:st={dur-1.5}:d=1.5[m]')
    fc.append('[2:a]volume=0.5[s]')
    fc.append(f'[m][s][vo]amix=inputs=3:duration=longest:normalize=0,alimiter=limit=0.89,volume=0.88,atrim=0:{dur}[a]')
    cmd += ['-filter_complex', ';'.join(fc), '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-t', str(dur), f'{out}/video.mp4']
    r = subprocess.run(cmd, capture_output=True, text=True); print(out, 'ok' if r.returncode == 0 else r.stderr[-400:])
