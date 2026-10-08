import sys,glob
from PIL import Image,ImageDraw
fmt=sys.argv[1];pre=sys.argv[2] if len(sys.argv)>2 else ''
T=[0.5,1.7,2.2,3.0,3.9,5.0,5.9,6.8,7.7,9.0,10.5,12.0,13.6,15.0,15.8,17.4,18.6,21.5] if pre=='s4-' else [0.6,1.8,3.4,4.3,5.6,6.6,7.2,7.8,9.0,11.2,12.5,13.6,14.9,15.7,17.0,19.5] if pre=='s3-' else [0.4,1.3,2.0,3.0,4.5,6.3,7.5,9.5,10.6,12.0,13.4,14.4,15.4,16.2,17.0,17.9] if pre else [0.5,1.6,2.5,3.6,5.0,6.2,7.8,9.4,10.6,11.7,12.5,13.3,14.0,14.9]
fs=sorted(glob.glob(f'{pre}sheet-{fmt}/*.png'))
tw,th=(270,480) if fmt=='v' else (480,270)
cols=9 if pre=='s4-' else 8 if pre else 7;rows=(len(fs)+cols-1)//cols
s=Image.new('RGB',(cols*tw,rows*(th+22)),'white');d=ImageDraw.Draw(s)
for i,f in enumerate(fs):
    im=Image.open(f).convert('RGB').resize((tw,th));x,y=(i%cols)*tw,(i//cols)*(th+22)
    s.paste(im,(x,y+22));d.text((x+4,y+4),f't={T[i]}',fill='black')
s.save(f'{pre}contact-sheet-{fmt}.png')
