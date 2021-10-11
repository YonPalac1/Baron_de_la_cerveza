-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: barondelacerveza2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Lager'),(2,'IPA'),(3,'Cerveza Negra'),(4,'Dorada'),(6,'Clasica');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `city` varchar(350) CHARACTER SET utf8mb4 DEFAULT NULL,
  `phone` varchar(350) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_FK` (`userId`),
  CONSTRAINT `contacts_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'dto Alvarez','BsAs',17,'Argentina','125656146');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `trademarkId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `alcoholContent` decimal(10,0) DEFAULT NULL,
  `outstanding` tinyint(1) DEFAULT NULL,
  `images` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `trademark_idx` (`trademarkId`),
  CONSTRAINT `trademark` FOREIGN KEY (`trademarkId`) REFERENCES `trademarks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Hoppy Lager',200,10,'Cerveza lager , de amargor moderado pero fácil de percibir. Notablemente balanceado con una base bien maltosa, como a bizcocho, pan tostado, proveniente de la malta vienna. De final seco y cuerpo ligero.',1,NULL,NULL,NULL,1,'img1.jpg'),(2,'Dark Vader',1350,NULL,'Prima hermana de nuestra Superstar, La Dark Vader es una cerveza negra con intensa presencia de lúpulos tanto en aroma como en sabor.',2,NULL,NULL,NULL,0,'img2.png'),(3,'Noire',250,10,'Cerveza Stella Artois Noire Schwarzbier negra lata 473 mL 6 u',3,NULL,NULL,NULL,NULL,'img3.png'),(4,'Dorada Original',200,5,'La Cerveza Brahma Dorada es fácil de tomar, suave y ligera, con baja carbonatación. ',4,NULL,NULL,4,1,'img4.png'),(5,'Fernandez',201,NULL,'La cerveza Fernández IPA es ideal para maridar con platos aromáticos e intensos, vegetales grillados, carnes rojas con especias y salsas herbales o brochettes.',1,NULL,NULL,5,1,'img5.png'),(6,'Chop',180,NULL,'Cerveza suave y refrescante',4,NULL,NULL,4,NULL,'img6.png'),(7,'Andes Origen',200,12,'CERVEZA ANDES ORIGEN Negra LATA 473ML',6,NULL,NULL,NULL,NULL,'img7.png'),(8,'Black Mamba',230,12,'Es una cerveza balanceado de color dorado profundo, con dulce aroma a malta y leve aroma a lúpulo. en boca se percibe la maltosidad con un carácter leve a tostado y con un bajo frutado. Finaliza con un amargo medio, creando una cerveza de gran tomabilidad.',7,NULL,NULL,7,NULL,'img2.png'),(9,'Cerveza Clasica',200,NULL,'Quilmes Red Lager es una cerveza roja que se destaca por su equilibrio, cremosidad y su delicado sabor amargo. Resulta fácil de tomar e ideal para resaltar momentos especiales. Su color rojo cobrizo es producto de la perfecta combinación de maltas finamente seleccionadas y el tostado natural de los taninos de la cebada durante el proceso de malteo. ',8,NULL,NULL,NULL,NULL,'img9.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trademarks`
--

DROP TABLE IF EXISTS `trademarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trademarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_idx` (`categoryId`),
  CONSTRAINT `categoria` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trademarks`
--

LOCK TABLES `trademarks` WRITE;
/*!40000 ALTER TABLE `trademarks` DISABLE KEYS */;
INSERT INTO `trademarks` VALUES (1,'Patagonia',1,NULL,NULL),(2,'Bier House',2,NULL,NULL),(3,'Estella Artois',3,NULL,NULL),(4,'Brahma',4,NULL,NULL),(5,'Patagonia',2,NULL,NULL),(6,'Andes',3,NULL,NULL),(7,'Grunge',3,NULL,NULL),(8,'Quilmes',6,NULL,NULL);
/*!40000 ALTER TABLE `trademarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Jona','Jona','mail3@mail.com','$2a$10$g9YXAsgvDDsFzEkSsqi3Fes8e/9mvviTSUYTs13llZf/5/YwpVncO',0,'2021-09-24 02:05:57','2021-09-24 02:48:31','1632450586832_img_.jpg'),(18,'Jona','Jona','jona@mail.com','$2a$12$FbpqloXrm/TLwKhJpeQ.7OSMQLHH1CEu6XkSLRC2jMxPD50QKjAo.',0,'2021-10-04 23:32:54','2021-10-05 23:07:06','default-image.png'),(19,'Jonat','Jona','jonata@mail.com','$2a$12$.7zr7rcxZSGgFC/2559hsuizGjYb1DeF8/34gnN3rRXDLse1fqDwm',0,'2021-10-04 23:33:19','2021-10-04 23:33:19','default-image.png'),(20,'Jonat','Jona','jonatan@mail.com','$2a$12$a4kyHYjnjVY/ULoAkXkX0ObalxNqlO9lEfHK8.Ilzc8HtoDLX5qPm',0,'2021-10-04 23:33:58','2021-10-04 23:33:58','default-image.png'),(21,'Jonat','Jona','jonat@mail.com','$2a$12$RQh6Affg9WfTb.J0qM0P9OZDciXDitVxRFJrq/avUfAlbhkj653i6',0,'2021-10-04 23:36:20','2021-10-04 23:36:20','default-image.png'),(22,'Jonatan','Jona','jonatan1@mail.com','$2a$12$G/5ui2am.2NlEgJ6EVwjju9NrJ0nDhoe8YEizCW8HY0pDNu5nZdjO',0,'2021-10-04 23:39:11','2021-10-04 23:39:11','default-image.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'barondelacerveza2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-12  1:19:13
