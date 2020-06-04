# -*- coding: UTF-8 -*-

import asyncio
import websockets
import time

# 检测客户端权限，用户名密码通过才能退出循环
async def check_permit(websocket):
    while True:
        recv_str = await websocket.recv()
        cred_dict = recv_str.split(":")
        if cred_dict[0] == "admin" and cred_dict[1] == "123456":
            response_str = "congratulation, you have connect with server\r\nnow, you can do something else"
            await websocket.send(response_str)
            return True
        else:
            response_str = "sorry, the username or password is wrong, please submit again"
            await websocket.send(response_str)

# 接收客户端消息并处理，这里只是简单把客户端发来的返回回去
async def recv_msg(websocket):
    while True:
        recv_text = await websocket.recv()
        response_text = f"your submit context: {recv_text} answer"
        await websocket.send(response_text)

async def send_msg_time(websocket):
    while True:
        ses = time.time()
        #recv_text = await websocket.recv()
        response_text = f"time: {ses}"
        await websocket.send(response_text)
        time.sleep(5)

# 服务器端主逻辑
async def main_logic(websocket, path):
    #await check_permit(websocket)
    await recv_msg(websocket)
    #await send_msg_time(websocket)

start_server = websockets.serve(main_logic, '127.0.0.1', 8085)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()