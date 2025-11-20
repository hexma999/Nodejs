import pyautogui
import keyboard
import time

time.sleep(3)  # 준비 시간

# 한글 유니코드 범위
start = 0xAC00  # '가'
end = 0xD7A3    # '힣'

try:
    while True:
        for code in range(start, end + 1):
            char = chr(code)
            keyboard.write(char)
            keyboard.press("enter")
            time.sleep(0.01)  # 너무 빠르지 않게 딜레이 (50ms)
except KeyboardInterrupt:
    print("프로그램 종료")