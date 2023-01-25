import socket
import os # pentru dimensiunea fisierului
import json

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
	print('#########################################################################')
	print ('Serverul asculta potentiali clienti.')
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	print ('S-a conectat un client.')
	# se proceseaza cererea si se citeste prima linie de text
	cerere = ''
	linieDeStart = ''
	while True:
		buf = clientsocket.recv(1024)
		if len(buf) < 1:
			break
		cerere = cerere + buf.decode()
		#print ('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------') aia cu locatia si procesarea
		pozitie = cerere.find('\r\n')
		if (pozitie > -1 and linieDeStart == ''):
			linieDeStart = cerere[0:pozitie]
			#print('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
			break
	print ('S-a terminat cititrea.')
	if linieDeStart == '':
		clientsocket.close()
		print ('S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.')
		continue
	# interpretarea sirului de caractere `linieDeStart`
	elementeLineDeStart = linieDeStart.split()
	# TODO securizare
	numeResursaCeruta = elementeLineDeStart[1]
	
	if elementeLineDeStart[0] == 'POST':
		continut_cerere = cerere.split('\n')
		last = continut_cerere[len(continut_cerere) - 1]
		continutul = json.loads(last)

		
		if continutul["utilizator"] and continutul["parola"]:
			user = continutul["utilizator"]
			passs = continutul["parola"]
			nume = continutul["fname"]
			lname = continutul["lastname"]
			email = continutul["email"]
			age = continutul["age"]
			tara = continutul["tara"]
			marca = continutul["marca"]
			color = continutul["color"]
			livrare = continutul["livrare"]
			timp = continutul["timp"]
			po = continutul["po"]
			url = continutul["urs"]

			current_dir =  os.path.abspath(os.path.dirname(__file__))
			with open(os.path.abspath(current_dir + "/../continut/resurse/utilizatori.json"), "r+") as json_file:
				data = json.load(json_file)

				seek = False
				for dats in  data:
					if user == str(dats["utilizator"]):
						print("O mai fost")
						seek = True
				
				if not seek:
					new_sclav = {
						"utilizator" :user,
						"parola": passs,
						"fname": nume,
						"lastname":lname,
						"email" : email,
						"age" : age,
						"tara": tara,
						"marca" : marca,
						"color" : color,
						"livrare": livrare,
						"timp" :timp,
						"po": po,
						"urs": url

					}
					data.append(new_sclav)
					json_deload = json.dumps(data,indent=2)
					json_file.truncate(0)
					json_file.seek(0)
					json_file.write(json_deload)
					
		# se trimite raspunsul
		clientsocket.sendall('HTTP/1.1 200 OK\r\n'.encode('utf-8'))
		clientsocket.sendall(('Content-Length: ' + str(0) + '\r\n').encode('utf-8'))
		clientsocket.sendall(('Content-Type: ' + tipMedia +'\r\n').encode('utf-8'))
		clientsocket.sendall(('Server: My PW Server\r\n').encode('utf-8'))
		clientsocket.sendall(('\r\n').encode('utf-8'))
	
	if elementeLineDeStart[0] == 'GET':
		if numeResursaCeruta == '/':
			numeResursaCeruta = '/index.html'
		
		# calea este relativa la directorul de unde a fost executat scriptul
		numeFisier = '../continut' + numeResursaCeruta
		
		fisier = None
		try:
			# deschide fisierul pentru citire in mod binar
			fisier = open(numeFisier,'rb')
			# tip media
			numeExtensie = numeFisier[numeFisier.rfind('.')+1:]
			tipuriMedia = {
				'html': 'text/html; charset=utf-8',
				'css': 'text/css; charset=utf-',
				'js': 'text/javascript; charset=utf-8',
				'png': 'image/png',
				'jpg': 'image/jpeg',
				'jpeg': 'image/jpeg',
				'gif': 'image/gif',
				'ico': 'image/x-icon',
				'xml': 'application/xml; charset=utf-8',
				'json': 'application/json; charset=utf-8'
			}
			tipMedia = tipuriMedia.get(numeExtensie,'text/plain; charset=utf-8')
			
			# se trimite raspunsul
			clientsocket.sendall('HTTP/1.1 200 OK\r\n'.encode('utf-8'))
			clientsocket.sendall(('Content-Length: ' + str(os.stat(numeFisier).st_size) + '\r\n').encode('utf-8'))
			clientsocket.sendall(('Content-Type: ' + tipMedia +'\r\n').encode('utf-8'))
			clientsocket.sendall(('Server: My PW Server\r\n').encode('utf-8'))
			clientsocket.sendall(('\r\n').encode('utf-8'))
			
			# citeste din fisier si trimite la server
			buf = fisier.read(1024)
			while (buf):
				clientsocket.send(buf)
				buf = fisier.read(1024)
		except IOError:
			# daca fisierul nu exista trebuie trimis un mesaj de 404 Not Found
			msg = 'Eroare! Resursa ceruta ' + numeResursaCeruta + ' nu a putut fi gasita!'
			print(msg)
			clientsocket.sendall(('HTTP/1.1 404 Not Found\r\n').encode('utf-8'))
			clientsocket.sendall(('Content-Length: ' + str(len(msg.encode('utf-8'))) + '\r\n').encode('utf-8'))
			clientsocket.sendall(('Content-Type: text/plain; charset=utf-8\r\n').encode('utf-8'))
			clientsocket.sendall(('Server: My PW Server\r\n').encode('utf-8'))
			clientsocket.sendall(('\r\n').encode('utf-8'))
			clientsocket.sendall(msg)

		finally:
			if fisier is not None:
				fisier.close()
	clientsocket.close()
	print( 'S-a terminat comunicarea cu clientul.')