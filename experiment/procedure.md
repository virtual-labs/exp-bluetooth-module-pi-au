### Procedure

  <h4>Hardware Setup</h4>
   
- Connect the **Vcc** of the HC-05 Bluetooth module to the **5V power** pin of the Raspberry Pi.
- Connect the **TX** pin of the HC-05 Bluetooth module to the **UART0 RX** pin of the Raspberry Pi.
- Connect the **RX** pin of the HC-05 Bluetooth module to the **UART0 TX** pin of the Raspberry Pi.
- Connect the **GND** pin of the HC-05 Bluetooth module to the **GND** pin of the Raspberry Pi.
- On the smartphone, click the Bluetooth icon to enable Bluetooth.
- Toggle the Bluetooth switch on the smartphone screen to turn it on.
- Select the Raspberry Pi from the list of available devices.
- Click the **Pair** option to pair the smartphone with the Raspberry Pi.

 
- After completing the circuit, the user can enter the data into the code, and it will be transferred to the smartphone via Bluetooth, displaying on the smartphone.

 <h4>Software Setup</h4>
    <p>1. Setting up Raspberry Pi’s Bluetooth - In the beginning, you'll need a monitor + keyboard connected, alternatively access the Raspberry Pi over SSH just to be able to establish all the configurations required through the Raspbian Terminal.</p>
    <p>Run the commands below carefully to establish the proper configurations:</p>
    <ul>
        <li>Install bluez (Python bluetooth library)</li>
        <pre><code>$ sudo apt-get install python-bluez</code></pre>
        <li>Start the Bluetooth daemon in compatibility mode. To do this, edit <code>/etc/systemd/system/dbus-org.bluez.service</code>, by running the command below:</li>
        <pre><code>$ sudo nano /etc/systemd/system/dbus-org.bluez.service</code></pre>
        <li>Then, modify the <code>ExecStart</code> param:</li>
        <pre><code>ExecStart=/usr/lib/bluetooth/bluetoothd –C</code></pre>
        <div>
            <img src="./images/7.1.png" alt="conventional database" width="50%">
        </div>
        <li>Now, load the serial port profile by using the command below:</li>
        <pre><code>$ sudo sdptool add SP</code></pre>
        <div>
            <img src="./images/exp72.png" alt="conventional database" width="50%">
        </div>
        <li>To save the changes properly, restart your Pi:</li>
        <pre><code>$ sudo reboot</code></pre>
        <div>
            <img src="./images/exp73.png" alt="conventional database" width="50%">
        </div>
    </ul>
    <p>After the Rebooting let us pair the Bluetooth with our android phone</p>
    <p>1. Pairing Raspberry Pi and Android Phone.</p>
    <p>Pair your Android phone with your Raspberry Pi. To do this, turn your phone's bluetooth on, and run the command below in your Pi:</p>
    <div>
        <img src="./images/exp75.png" alt="conventional database" width="50%">
 <p>Then, once the pairing process starts inserting the following parameters. (Refer to the image to get a better idea of the flow process)</p>
    <ul>
        <li>power on</li>
        <li>discoverable on</li>
        <li>scan on</li>
        <li>At this point, your phone will appear in the list of available devices. Take note of the address of your phone.</li>
        <li>trust &lt;PHONE_ADDRESS&gt;</li>
        <li>pair &lt;PHONE_ADDRESS&gt;</li>
 <div>
        <img src="./images/exp76.png" alt="conventional database" width="50%">
    </div>
    <p>2. To just exit the bluetooth ctl, write the quit command:</p>
    <pre><code>$ quit</code></pre>
    <p>3. You can skip the above setup, by setting up the Bluetooth with UI of
  <h4>Python Code</h4>
    <pre><code>
import bluetooth

def start_bluetooth_server():
    server_sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    port = 1  # You can use any available port
    server_sock.bind(("", port))
    server_sock.listen(1)
    print("Waiting for Bluetooth connection...")
    client_sock, client_info = server_sock.accept()
    print("Accepted connection from", client_info)
    try:
        while True:
            message = input("Enter your message: ")
            if not message:
                break
            client_sock.send(message)
            print(f"Sent: {message}")
    except KeyboardInterrupt:
        print("Interrupted by user")
    finally:
        print("Closing connection...")
        client_sock.close()
        server_sock.close()
        print("Server closed")

if __name__ == "__main__":
    start_bluetooth_server()
    </code></pre>