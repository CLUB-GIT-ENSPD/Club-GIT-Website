import type {
  AuditionLevel,
  AuditionOption,
  AuditionQuestion,
  AuditionTrack,
} from '../types/audition';

/**
 * Données du formulaire d'audition, reprises du formulaire Tally du club
 * (M1evNY). Les identifiants `tallyId` sont conservés pour envoyer les
 * réponses au formulaire Tally officiel.
 *
 * Si le formulaire Tally est modifié, il faut régénérer ce fichier pour
 * récupérer les nouveaux libellés et identifiants de blocs.
 */
const AUDITION_GENERAL_QUESTIONS_RAW: AuditionQuestion[] = [
    {
      id: "g-nom-et-prenom",
      tallyId: "44bccaa6-1f3a-4557-a6db-689c1f8307b4",
      label: "Nom et prénom",
      type: "text",
      required: true,
    },
    {
      id: "g-adresse-email",
      tallyId: "19f82c03-78cf-4f78-bc42-3e80009d047d",
      label: "Adresse email",
      type: "email",
      required: true,
    },
    {
      id: "g-numero-whatsapp",
      tallyId: "d65b4ca0-070a-4e87-bc54-f0fbfb7d0bf1",
      label: "Numéro WhatsApp",
      type: "tel",
      required: true,
    },
    {
      id: "g-ton-niveau-academique",
      tallyId: "869aa3d0-d385-4cea-a684-653aebe975b3",
      label: "Ton niveau académique",
      type: "choice",
      required: true,
      options: [
        { tallyId: "fb022d54-f28c-4a21-b230-46196282207e", label: "Niveau 1" },
        { tallyId: "a6c20d2e-186c-4593-8ce6-43c629c63dc4", label: "Niveau 2" },
        { tallyId: "edef7bd7-c06c-4f3b-95d2-7aa488289139", label: "Niveau 3" },
        { tallyId: "d0b9ae73-915c-4453-8532-5e2c94429955", label: "Niveau 4" },
      ],
    },
    {
      id: "g-ta-filiere",
      tallyId: "5fb47fde-d1af-4e28-8544-c29c5e32039a",
      label: "Ta filière",
      type: "choice",
      required: true,
      options: [
        { tallyId: "beef1484-a8ba-4dba-b87f-ab52b1d2773c", label: "Informatique" },
        { tallyId: "99396027-5cee-4d59-bd83-bd680778dde3", label: "Télécoms" },
      ],
    },
    {
      id: "g-pourquoi-veux-tu-rejoindre-le-club",
      tallyId: "8c6913fa-668e-4c0c-8358-06e3f794868f",
      label: "Pourquoi veux-tu rejoindre le club ?",
      type: "textarea",
      required: true,
    },
    {
      id: "g-combien-d-heures-par-semaine-peux-tu-consacrer-au-club",
      tallyId: "52158339-bc48-48d9-9d1a-b577a94994fe",
      label: "Combien d'heures par semaine peux-tu consacrer au club ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "a90d6fa0-cd16-4f63-a134-61fd6dec5499", label: "Moins de 2 h" },
        { tallyId: "faceee5d-04c9-436b-b339-e33e938966cb", label: "2 à 4 h" },
        { tallyId: "625be3c4-9ce2-42da-a721-43d307ff220c", label: "Plus de 4 h" },
      ],
    },
];

const AUDITION_LEVEL_QUESTIONS_RAW: Record<AuditionLevel, AuditionQuestion[]> = {
  1: [
    {
      id: "n1-combien-de-bits-y-a-t-il-dans-un-octet",
      tallyId: "6c0cf8a3-e9e1-461f-949a-5eda7d3816f6",
      label: "Combien de bits y a-t-il dans un octet ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "08e19005-d9e9-4ebd-969d-23c557a4fbd0", label: "4" },
        { tallyId: "dd8b7666-718c-450c-9ba6-d3d37f6df540", label: "16" },
        { tallyId: "8593ff6a-80d7-40c6-8b1f-2e1e71bf800a", label: "8" },
        { tallyId: "1b3a56f4-1c7d-45ac-a401-128557499bd4", label: "32" },
      ],
    },
    {
      id: "n1-quel-est-le-role-d-un-routeur",
      tallyId: "04d05b2c-fdd5-4191-9b89-5846cfff7a51",
      label: "Quel est le rôle d'un routeur ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "b31aaaa4-2e42-46d5-a8f0-69054dfe2522", label: "Stocker des fichiers" },
        { tallyId: "836df633-4e10-464a-8025-4a8febe16ff8", label: "Connecter des réseaux entre eux" },
        { tallyId: "7ef473d7-305e-4247-8b70-3f4361f5404b", label: "Afficher des images" },
        { tallyId: "ec185cde-043f-43e2-bf78-3045c1234918", label: "Imprimer des documents" },
      ],
    },
    {
      id: "n1-complete-la-suite-2-4-8-16",
      tallyId: "4c220620-e490-4ee0-8dcb-2e00aabe592a",
      label: "Complète la suite : 2, 4, 8, 16, ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "359350f0-8d66-4dfe-9e70-4d0fdc1dc97e", label: "24" },
        { tallyId: "6e217730-39e3-4c2b-ab09-b369f346a760", label: "30" },
        { tallyId: "f097fe4c-6f3e-4f3d-bb81-9096938c6a2b", label: "64" },
        { tallyId: "2dd6109e-7b6a-4b01-b52c-d1cf45e7da67", label: "32" },
      ],
    },
    {
      id: "n1-quel-composant-est-le-cerveau-de-l-ordinateur",
      tallyId: "5ce73aa2-a5d9-4f2b-a8da-508cfb5232b6",
      label: "Quel composant est le « cerveau » de l'ordinateur ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "f383e8f9-2d57-4920-9db5-e32b07eff671", label: "Processeur" },
        { tallyId: "a4fa61e5-bd4d-4492-a260-56016988ae7b", label: "Disque dur" },
        { tallyId: "5f732e5f-6b0d-42a6-9cac-628468b12e20", label: "Écran" },
        { tallyId: "98982580-2d10-4599-bf3f-0e26d0449fec", label: "Alimentation" },
      ],
    },
    {
      id: "n1-quel-appareil-technologique-t-intrigue-et-comment-fonc",
      tallyId: "d990554f-4081-4e0a-829e-bd6dac2206cf",
      label: "Quel appareil technologique t'intrigue, et comment fonctionne-t-il selon toi ?",
      type: "textarea",
      required: true,
    },
    {
      id: "n1-quel-est-le-role-d-un-systeme-d-exploitation",
      tallyId: "7c913ba5-8fee-4bb2-9710-9aece960bcc8",
      label: "Quel est le rôle d'un système d'exploitation ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "7ef91e01-d748-40ea-94a7-50ba0eba4470", label: "Gérer le matériel et les logiciels de l'ordinateur" },
        { tallyId: "f83f9b59-8963-4160-bedb-4f65cfcb0e33", label: "Créer des sites web" },
        { tallyId: "1162e89c-e9b7-45fb-96f5-8957fbcc4e52", label: "Fabriquer les composants électroniques" },
        { tallyId: "9398cdc7-f13a-4610-92e0-d03d6145909f", label: "Protéger l'écran" },
      ],
    },
    {
      id: "n1-lequel-de-ces-elements-est-un-langage-de-programmation",
      tallyId: "e9eb1eaf-f64d-4850-af7d-ae392449f412",
      label: "Lequel de ces éléments est un langage de programmation ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "a087de75-dafc-4bb6-9ae6-6562be0fbd2e", label: "Windows" },
        { tallyId: "119f3aa7-10bf-4b12-8f60-22ca866faae2", label: "Python" },
        { tallyId: "2e2eb1a6-bc71-4cf7-ad92-9f765cb3a484", label: "Chrome" },
        { tallyId: "7450b200-98b1-4049-9732-541d2afecd73", label: "USB" },
      ],
    },
    {
      id: "n1-quelle-unite-mesure-la-capacite-de-stockage-d-un-disqu",
      tallyId: "5ca00578-2c55-4bc7-9f07-bbffb97d5fab",
      label: "Quelle unité mesure la capacité de stockage d'un disque ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "168dc8c2-e089-4d44-92b1-e8525ed32db0", label: "Hertz" },
        { tallyId: "3778b718-dd7a-4a1c-94da-b17190cdc179", label: "Volt" },
        { tallyId: "6993b7f2-3790-44b9-9b45-1a7664c7f35a", label: "Octet (ex. Go)" },
        { tallyId: "1715bc79-d051-4e2c-b3fe-d31e485152a1", label: "Pixel" },
      ],
    },
    {
      id: "n1-que-signifie-www-dans-une-adresse-web",
      tallyId: "148daf22-7f9a-48f2-9e61-9684b003a836",
      label: "Que signifie « www » dans une adresse web ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "6d8ca139-8701-4905-af7e-7b00a04e8ebb", label: "World Wide Web" },
        { tallyId: "0a676a02-84ee-4cc5-ac1c-f2c013f1ce05", label: "Wireless Web Window" },
        { tallyId: "165bd5f2-de7d-47d2-a119-7219217429ad", label: "Web World Wire" },
        { tallyId: "5b956b1c-b2b5-4c78-be1d-bc2a17108bae", label: "Wide World Wireless" },
      ],
    },
    {
      id: "n1-lequel-de-ces-peripheriques-est-un-peripherique-d-entr",
      tallyId: "8783a010-459c-420d-bbca-42d01be458ad",
      label: "Lequel de ces périphériques est un périphérique d'entrée ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "a9d02cbf-daa3-4ccf-b83b-afe57d88124d", label: "Imprimante" },
        { tallyId: "0635818a-7290-4ff0-9e43-35431504e243", label: "Écran" },
        { tallyId: "de3fa0b4-430e-4f9d-92ac-64708a69dc93", label: "Haut-parleur" },
        { tallyId: "5f5031c9-92cb-4d31-a9e0-ec9cc9c5497d", label: "Clavier" },
      ],
    },
    {
      id: "n1-que-designe-la-ram-d-un-ordinateur",
      tallyId: "54d305fb-a0a9-4674-b3af-3de454450d59",
      label: "Que désigne la RAM d'un ordinateur ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "3e17b70b-2bd5-4a8b-bd0c-9e0f212725dd", label: "Le stockage permanent des fichiers" },
        { tallyId: "acd643c6-c388-45ff-b436-3fd35f34cac2", label: "La mémoire vive, temporaire et rapide" },
        { tallyId: "aef79b64-01fe-46e3-a9e7-74d225f07412", label: "Le processeur graphique" },
        { tallyId: "74815a93-be64-48b2-94d6-6ea4d0da6ebf", label: "La carte réseau" },
      ],
    },
    {
      id: "n1-quel-est-le-resultat-de-5-3-2",
      tallyId: "c8d67d3c-2f80-4a5b-8c70-a84bb7221224",
      label: "Quel est le résultat de 5 + 3 × 2 ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "f7cf2551-62e2-4b21-9569-c226d8a70b65", label: "16" },
        { tallyId: "6b521071-0c7e-41a8-ac26-d7939c447956", label: "13" },
        { tallyId: "46f98cb5-04ed-4a44-807a-9ccbd415855f", label: "10" },
        { tallyId: "03a8e1e2-0a1d-40e2-b626-5778261bef5b", label: "11" },
      ],
    },
    {
      id: "n1-qu-est-ce-qu-une-variable-en-programmation",
      tallyId: "b99c68b8-1e48-4e9e-ae6a-744bf902c399",
      label: "Qu'est-ce qu'une variable en programmation ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "0a195c5b-d6cf-491e-aea9-3450a5b85da4", label: "Un type d'écran" },
        { tallyId: "fe69d2d1-88cd-42bf-b732-7cbdbf58b4a6", label: "Un espace mémoire nommé qui stocke une valeur" },
        { tallyId: "ac851049-ddb9-462b-82a0-b6b07baa30fc", label: "Une erreur du programme" },
        { tallyId: "fa102954-83da-4fbb-8230-9f6507fc191c", label: "Un câble réseau" },
      ],
    },
    {
      id: "n1-quel-symbole-sert-a-affecter-une-valeur-a-une-variable",
      tallyId: "f3074a83-454c-4503-a784-f78e0db584b7",
      label: "Quel symbole sert à affecter une valeur à une variable dans la plupart des langages ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "e798be38-99d8-4c3d-8058-2623750fd8ac", label: "==" },
        { tallyId: "1253c891-6598-4a63-9072-addf7666bedc", label: "!=" },
        { tallyId: "c5b89739-b0c9-46db-915e-5e3a7318c7fb", label: "=" },
        { tallyId: "04a633aa-2cb0-4e16-8822-37ab7add5405", label: "<=" },
      ],
    },
    {
      id: "n1-que-fait-la-commande-print-bonjour-en-python",
      tallyId: "1d0392b9-89bb-42b2-8f90-8210d648242d",
      label: "Que fait la commande print(\"Bonjour\") en Python ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "eb74f669-3062-4b41-b60b-5962280ffc28", label: "Elle efface un fichier" },
        { tallyId: "0efb91f9-2389-41af-840b-4a33784856fa", label: "Elle affiche Bonjour à l'écran" },
        { tallyId: "1f7aee74-4473-464c-ad1c-202893dbc20d", label: "Elle envoie un e-mail" },
        { tallyId: "8700ab8d-ff28-42eb-9a58-f1cc3998d282", label: "Elle ferme le programme" },
      ],
    },
    {
      id: "n1-quelle-unite-mesure-la-frequence",
      tallyId: "29284227-7561-4629-8a0c-8ba124ce914f",
      label: "Quelle unité mesure la fréquence ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "29bf7922-46e6-4742-909e-1ef524668abf", label: "Volt" },
        { tallyId: "277fcbc1-0fac-4df3-879e-c84f59b7ac0f", label: "Hertz (Hz)" },
        { tallyId: "8c6d5143-c8e8-48c4-a592-021deaa4dafe", label: "Watt" },
        { tallyId: "30d632ef-98e0-46ee-8642-169272fde639", label: "Mètre" },
      ],
    },
    {
      id: "n1-un-signal-numerique-prend-quelles-valeurs",
      tallyId: "670e6b67-a191-4aed-876d-cc8510bb68e7",
      label: "Un signal numérique prend quelles valeurs ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "d2b88237-e8e4-4f31-a531-4aba1d5be7c5", label: "Toutes les valeurs de façon continue" },
        { tallyId: "4234c45a-1b78-4a24-937e-44174676378d", label: "Des valeurs discrètes, par exemple 0 et 1" },
        { tallyId: "157712d1-29e6-4bbe-82c9-0b0835676a02", label: "Uniquement des valeurs négatives" },
      ],
    },
    {
      id: "n1-cite-un-exemple-de-support-de-transmission",
      tallyId: "89489d22-86a5-47b1-b156-1bf6672c1db3",
      label: "Cite un exemple de support de transmission.",
      type: "text",
      required: true,
      track: "telecoms",
    },
  ],
  2: [
    {
      id: "n2-que-vaut-1011-binaire-en-decimal",
      tallyId: "3f78170e-1b9f-4f86-9f91-61b7dd8bf590",
      label: "Que vaut 1011 (binaire) en décimal ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "6df9050b-d74b-4dba-a410-4a55054799fd", label: "9" },
        { tallyId: "6a09b06f-03d6-422d-aab0-f36397cf6ad4", label: "10" },
        { tallyId: "0b73ef55-dc38-477e-ab98-c61d71a64ff9", label: "13" },
        { tallyId: "44e3fbf5-1778-444e-ada8-bddc02e2b5e4", label: "11" },
      ],
    },
    {
      id: "n2-que-fait-une-boucle-for",
      tallyId: "32e12df5-9eeb-4c68-b2ac-8265f8e06cc8",
      label: "Que fait une boucle « for » ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "75e57f5e-957f-4211-be6c-c5a253d567da", label: "Elle affiche un message à l'écran" },
        { tallyId: "84ff969b-f85c-4d04-a350-6c9354f41375", label: "Elle répète des instructions" },
        { tallyId: "ebbc7204-dd7c-41a6-8e28-692d19a87e89", label: "Elle supprime une variable" },
        { tallyId: "41c4db19-041d-4b01-a9f2-54fe29721cf8", label: "Elle ferme le programme" },
      ],
    },
    {
      id: "n2-quelle-couche-du-modele-osi-gere-le-routage-ip",
      tallyId: "1dedd2dc-b94c-4023-870d-86a35a97c13f",
      label: "Quelle couche du modèle OSI gère le routage IP ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "9a483f68-9586-47f7-a867-2c6d105b8696", label: "Couche 2 (Liaison)" },
        { tallyId: "056c7e3a-9f13-451b-b5d0-1d6dccec2021", label: "Couche 4 (Transport)" },
        { tallyId: "f8060cd7-0c76-4a4b-a216-9c0829900e90", label: "Couche 3 (Réseau)" },
        { tallyId: "f99802f1-7f9d-4e61-9b88-2d3f09f9cf77", label: "Couche 7 (Application)" },
      ],
    },
    {
      id: "n2-quelle-est-la-loi-d-ohm",
      tallyId: "a201b21f-6f0e-4c78-a70c-4ef93787a39b",
      label: "Quelle est la loi d'Ohm ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "cb67f4ba-b383-4730-b887-59bca01c0ece", label: "U = R × I" },
        { tallyId: "d2f1e17c-2435-47f9-ad67-e927c4f5582c", label: "U = R + I" },
        { tallyId: "80b089cf-dda1-4431-9df3-d78a9140e9a6", label: "I = U × R" },
        { tallyId: "d36b5a42-97e4-479a-9a9c-766f277b9beb", label: "R = U × I" },
      ],
    },
    {
      id: "n2-ecris-l-algorithme-en-pseudo-code-ou-dans-le-langage-d",
      tallyId: "75a1712a-436e-4e9d-9ac9-022029f702cd",
      label: "Écris l'algorithme (en pseudo-code ou dans le langage de ton choix) pour trouver le plus grand nombre d'une liste.",
      type: "textarea",
      required: true,
    },
    {
      id: "n2-que-renvoie-len-4-8-15-en-python",
      tallyId: "54c37b86-2e87-4a18-9a48-f8097c17eb2d",
      label: "Que renvoie len([4, 8, 15]) en Python ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "c3ce34a9-8a05-4276-8cbf-26e96da26871", label: "2" },
        { tallyId: "ce2ccc2a-bac7-4003-a559-6287029f66fc", label: "3" },
        { tallyId: "dfd650c5-283c-46ea-871c-440e8e02ec48", label: "15" },
        { tallyId: "4e7fefa8-ca0f-4c7c-8506-10c068fe1a8a", label: "27" },
      ],
    },
    {
      id: "n2-une-adresse-ipv4-est-composee-de-combien-d-octets",
      tallyId: "73831ef0-cf99-40d5-b277-b5242ebd720c",
      label: "Une adresse IPv4 est composée de combien d'octets ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "f2a07db2-5e08-4f52-bca5-743482863e05", label: "2" },
        { tallyId: "0dcd1af6-88b0-4449-83e3-836824eef870", label: "4" },
        { tallyId: "a41be558-aa88-49fb-a751-6ba4a3a5e330", label: "6" },
        { tallyId: "5601e818-b087-4535-8dcc-bff09c2f62cf", label: "16" },
      ],
    },
    {
      id: "n2-quelle-est-la-representation-binaire-du-nombre-5",
      tallyId: "94c53e0b-3e87-4e84-b1dd-e95a0346f1d6",
      label: "Quelle est la représentation binaire du nombre 5 ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "07d7830f-af82-445a-9909-c3ac67805181", label: "110" },
        { tallyId: "b9d2e429-0315-4169-b844-259e739b3392", label: "101" },
        { tallyId: "0ad679e0-0dab-45fe-9576-14047e67fbf8", label: "100" },
        { tallyId: "8414d209-a6db-4e26-b583-e7c01c6eae25", label: "111" },
      ],
    },
    {
      id: "n2-quel-composant-relie-et-alimente-en-communication-tous",
      tallyId: "4d4ef359-05e5-40b1-96d6-b523513fa759",
      label: "Quel composant relie et alimente en communication tous les autres composants d'un PC ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "3c7e5599-6d59-4357-9cf7-f454ff6c1762", label: "Carte mère" },
        { tallyId: "7b41b659-eeb7-4fde-80ed-0a81fcc539ec", label: "Ventilateur" },
        { tallyId: "a0aa6497-a3d2-41e5-8ab8-74e5236266fb", label: "Disque dur" },
        { tallyId: "64ac0ffb-2681-4b21-b49b-447295640134", label: "Clavier" },
      ],
    },
    {
      id: "n2-quelle-est-la-longueur-d-une-adresse-mac",
      tallyId: "a73578d7-adfe-4236-b89a-8f1a44d4acfc",
      label: "Quelle est la longueur d'une adresse MAC ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "99dda1c0-b3e0-4e11-b8f1-601006558f99", label: "32 bits" },
        { tallyId: "0326e8e1-2d0a-4d6a-93f4-6940aed98483", label: "64 bits" },
        { tallyId: "54e78888-0366-45ac-9c34-c3efe5847177", label: "48 bits" },
        { tallyId: "c4f34249-e58a-4e7b-8a0d-6ef8305ae50a", label: "128 bits" },
      ],
    },
    {
      id: "n2-quelle-unite-mesure-la-resistance-electrique",
      tallyId: "f1c10f1c-1240-4971-90d4-b4775905149f",
      label: "Quelle unité mesure la résistance électrique ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "6848903c-2dd4-4dc5-83fd-7b30832bc894", label: "Ampère" },
        { tallyId: "057b2e15-06aa-422e-aed8-08e6e91e31a8", label: "Watt" },
        { tallyId: "e8a88188-1a40-4576-916d-cc9234429715", label: "Volt" },
        { tallyId: "c5bcd1ae-b337-45d6-b420-cf750ad4c30b", label: "Ohm" },
      ],
    },
    {
      id: "n2-quelle-porte-logique-donne-1-uniquement-si-ses-deux-en",
      tallyId: "16593bd8-ef0c-4db3-86bf-679596d68396",
      label: "Quelle porte logique donne 1 uniquement si ses deux entrées valent 1 ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "ef38b2eb-2a4f-4474-98e5-cfd5f7d04e0b", label: "OR" },
        { tallyId: "3ee8a342-1636-4dc1-8a24-55906cd2a1a3", label: "XOR" },
        { tallyId: "5bed4dc0-83d3-43ed-8fa3-9b3beb8672cb", label: "AND" },
        { tallyId: "7746cfe5-1355-4594-ada4-4bfe63cf8a7c", label: "NOT" },
      ],
    },
    {
      id: "n2-quel-est-le-resultat-de-7-3",
      tallyId: "6764bd3e-3e7b-4e8c-b165-f16509964c8c",
      label: "Quel est le résultat de 7 % 3 ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "4b082ee1-9ce3-47ca-9d0b-093e5b3c1d92", label: "0" },
        { tallyId: "418e1e18-a1f4-4d3a-acba-19184547a4cf", label: "2" },
        { tallyId: "9fba7fba-cfa9-4649-9312-7778c456209d", label: "1" },
        { tallyId: "f87f1a33-b6f0-4311-b64f-90065089eb07", label: "3" },
      ],
    },
    {
      id: "n2-quel-mot-cle-permet-d-ecrire-une-condition-en-python",
      tallyId: "bc8fa111-6596-4a11-9394-1d23e47b7c5e",
      label: "Quel mot-clé permet d'écrire une condition en Python ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "de6f4f12-a93f-4498-b2a5-2c07c68c32b6", label: "loop" },
        { tallyId: "15483345-06a5-4a53-93e2-c92accd4fe2b", label: "stop" },
        { tallyId: "fef154f3-8f0e-484b-ac14-7fe28edd060f", label: "when" },
        { tallyId: "5b03ec82-74c7-45bf-a625-1553a35d0b5f", label: "if" },
      ],
    },
    {
      id: "n2-quel-type-de-donnees-sert-a-stocker-du-texte",
      tallyId: "4c9fcf29-4fc2-42b8-93ef-594c9bb42803",
      label: "Quel type de données sert à stocker du texte ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "2d9895b7-69db-4338-bf69-929e72e027f2", label: "int" },
        { tallyId: "29dae41a-496d-41f6-b877-373e89020bf6", label: "string" },
        { tallyId: "8347ab3b-4b25-4122-835e-a92c5c4b3db9", label: "float" },
        { tallyId: "641f9ce0-435e-4d46-b2ef-bebfc5c33bca", label: "bool" },
      ],
    },
    {
      id: "n2-quel-composant-stocke-une-charge-electrique",
      tallyId: "3767acf9-5f00-4fad-9c26-1574eb45c3b6",
      label: "Quel composant stocke une charge électrique ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "3ad14cb6-527a-4bfb-bbd9-92c1b2555e9f", label: "Résistance" },
        { tallyId: "1cdd8c39-6685-4739-b775-e01d56b88559", label: "Diode" },
        { tallyId: "b8b12020-1cac-4ec0-8b76-3c94fd29daeb", label: "Condensateur" },
        { tallyId: "e516688e-6c7c-4688-830e-0a6e88724ed7", label: "LED" },
      ],
    },
    {
      id: "n2-quelle-est-la-frequence-d-un-signal-de-periode-0-01-s",
      tallyId: "5f177eac-7f7a-465e-b132-fcad8bf9363d",
      label: "Quelle est la fréquence d'un signal de période 0,01 s ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "850660d7-96c9-4c7c-a8b4-42291dba77ba", label: "10 Hz" },
        { tallyId: "8baa4f19-205e-4b9c-9a61-7d5f5d0d0c55", label: "100 Hz" },
        { tallyId: "798e6e6d-86bb-46bc-bc39-adeb7fde8732", label: "1000 Hz" },
        { tallyId: "1b3d5bb4-c462-4a97-90dd-322ec1626221", label: "0,01 Hz" },
      ],
    },
    {
      id: "n2-quelle-est-la-difference-entre-un-signal-analogique-et",
      tallyId: "390555ce-899e-4c7f-8c4c-9eff76f27928",
      label: "Quelle est la différence entre un signal analogique et un signal numérique ?",
      type: "textarea",
      required: true,
      track: "telecoms",
    },
  ],
  3: [
    {
      id: "n3-quelle-est-la-complexite-d-une-recherche-dichotomique",
      tallyId: "4f7cf9ef-987a-47f0-b39a-97f7e06cb6e9",
      label: "Quelle est la complexité d'une recherche dichotomique ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "0089f029-7a0c-404d-bce6-b0164dbed2a6", label: "O(n)" },
        { tallyId: "a50c6d6d-c324-4211-ae4c-03ef09ea9cf9", label: "O(n²)" },
        { tallyId: "0c029e29-e053-499c-ad89-a66d6ac0a3b9", label: "O(log n)" },
        { tallyId: "3a3acc9f-3e68-44d8-9345-dd3cf98a45e2", label: "O(1)" },
      ],
    },
    {
      id: "n3-quel-protocole-de-transport-est-fiable-et-oriente-conn",
      tallyId: "22dacd07-3692-4090-82f7-c10a7d8fb41e",
      label: "Quel protocole de transport est fiable et orienté connexion ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "db2db5ab-2d37-4a63-b86d-a3195274c441", label: "UDP" },
        { tallyId: "a7ef6d5d-a2b8-44e7-9825-5b8736cb91b2", label: "TCP" },
        { tallyId: "95d76437-fc2d-413a-945d-8090cb106307", label: "ICMP" },
        { tallyId: "81988756-e8cb-4d00-89d6-735a839ce543", label: "ARP" },
      ],
    },
    {
      id: "n3-quelle-clause-sql-permet-de-filtrer-les-lignes-d-une-t",
      tallyId: "ac962bf8-a366-44ce-8e6b-e2f29ab453a7",
      label: "Quelle clause SQL permet de filtrer les lignes d'une table ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "759e246f-dc39-40ed-83dd-73dca04bd41e", label: "SELECT" },
        { tallyId: "42dc11d5-d1e7-4d08-af5d-7c147c7f9135", label: "ORDER BY" },
        { tallyId: "b628b1f7-9b65-4919-9b05-8ef826410a9e", label: "GROUP BY" },
        { tallyId: "38d4c771-2e31-4e19-8e21-0dc8f8d9a071", label: "WHERE" },
      ],
    },
    {
      id: "n3-quelle-est-la-difference-entre-la-modulation-am-et-la-",
      tallyId: "3afeb1d8-7928-40f0-8ab3-5ffaa58c54ce",
      label: "Quelle est la différence entre la modulation AM et la modulation FM ?",
      type: "textarea",
      required: true,
    },
    {
      id: "n3-explique-ce-qui-se-passe-entre-la-saisie-d-une-url-dan",
      tallyId: "8cef6cc1-23e1-4694-a9e7-a80e297f8a59",
      label: "Explique ce qui se passe entre la saisie d'une URL dans le navigateur et l'affichage de la page.",
      type: "textarea",
      required: true,
    },
    {
      id: "n3-quelle-structure-de-donnees-fonctionne-selon-le-princi",
      tallyId: "0020ed1e-74bb-4760-a462-de310d6e061e",
      label: "Quelle structure de données fonctionne selon le principe LIFO (dernier entré, premier sorti) ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "538b7a5c-958b-45cc-9ecc-8800ba7aab82", label: "File" },
        { tallyId: "97eec78b-cfaf-4457-b82b-d0369ec46613", label: "Pile" },
        { tallyId: "39d5c2c7-20bf-4b0d-a6cb-f1164ed3854b", label: "Tableau trié" },
        { tallyId: "62102d32-a065-4882-871a-763ecb77efd0", label: "Arbre binaire" },
      ],
    },
    {
      id: "n3-quel-est-le-role-du-protocole-dns",
      tallyId: "d9b8e691-94af-4cab-8791-cb4d43115f1d",
      label: "Quel est le rôle du protocole DNS ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "d3e940af-e6a3-4290-b56e-778707c1da66", label: "Chiffrer les échanges" },
        { tallyId: "1a26f838-4712-4805-8180-1617ff357967", label: "Attribuer automatiquement des adresses IP" },
        { tallyId: "15f748c0-c213-4a28-8aa2-0e9ec304d8dc", label: "Traduire les noms de domaine en adresses IP" },
        { tallyId: "cbd52af2-68a7-4b07-b6d2-fedce19f8126", label: "Envoyer des e-mails" },
      ],
    },
    {
      id: "n3-quelle-est-l-adresse-ipv4-de-bouclage-localhost",
      tallyId: "7dee807a-e6b9-4584-8ce9-4e9f7d4518ff",
      label: "Quelle est l'adresse IPv4 de bouclage (localhost) ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "98b23a3c-660f-45d6-ae70-889ccdc6e66b", label: "192.168.0.1" },
        { tallyId: "639e2960-fcdd-4095-8bc3-920eef895164", label: "10.0.0.1" },
        { tallyId: "10eb7d39-daa5-4668-a90e-d16f799ba8b6", label: "255.255.255.0" },
        { tallyId: "c4d77e5c-0aea-4039-9fd9-2cd6f1eca33e", label: "127.0.0.1" },
      ],
    },
    {
      id: "n3-quel-est-le-masque-de-sous-reseau-correspondant-a-un-p",
      tallyId: "62d9523c-bac0-4d21-9e3c-583cee3fdb8d",
      label: "Quel est le masque de sous-réseau correspondant à un préfixe /24 ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "d2610123-b1bb-4a9e-83a0-d8085bb0c31d", label: "255.255.0.0" },
        { tallyId: "1c5761eb-fcef-4d5c-af8c-3f8ab1fe639a", label: "255.255.255.0" },
        { tallyId: "a9bc88fd-9b17-4628-b55d-215eb3bf8688", label: "255.0.0.0" },
        { tallyId: "1ec6db19-e5e3-4365-bdf1-22d24b25aa49", label: "255.255.255.128" },
      ],
    },
    {
      id: "n3-quel-port-est-utilise-par-defaut-par-https",
      tallyId: "890cda31-2322-4994-a085-46e71779cc8e",
      label: "Quel port est utilisé par défaut par HTTPS ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "54f3a83a-7b2d-41a0-9e7a-90d134e2f3e5", label: "80" },
        { tallyId: "9800a2ef-9d5d-4db7-a3e4-1f2ae7043afc", label: "22" },
        { tallyId: "81a40b63-da77-4b4a-8b75-ae934fa444ea", label: "21" },
        { tallyId: "70dfe020-a698-49b4-9a8e-daa3e3f45095", label: "443" },
      ],
    },
    {
      id: "n3-quel-equipement-commute-les-trames-au-niveau-de-la-cou",
      tallyId: "6b926d44-5770-4201-8d4c-d7ca7e2b48e2",
      label: "Quel équipement commute les trames au niveau de la couche 2 (Liaison) ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "24dc9a75-7330-4b90-ae8b-ccc317a6fdd1", label: "Switch (commutateur)" },
        { tallyId: "1caf8fe5-0171-4dde-9ae4-365f96347a0a", label: "Routeur" },
        { tallyId: "fd2d3fb1-f909-4619-a6bb-27f202d4605e", label: "Modem" },
        { tallyId: "538cbe5e-7c6b-4984-bdc2-7b55b1ddd5ec", label: "Antenne" },
      ],
    },
    {
      id: "n3-quelle-est-la-valeur-hexadecimale-du-nombre-decimal-25",
      tallyId: "f8e562f2-6b1e-4e8a-bd91-e6ddcf4d4553",
      label: "Quelle est la valeur hexadécimale du nombre décimal 255 ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "faed1969-f5bf-4dad-a914-2ca6f5e14442", label: "0F" },
        { tallyId: "d03a30ef-235e-4abf-bdc0-c69e89bb72a5", label: "100" },
        { tallyId: "57df60ad-19d2-48d1-a16e-1a2f52c6a2ee", label: "FF" },
        { tallyId: "95374720-b024-4ccb-bc2d-8b36de875382", label: "EF" },
      ],
    },
    {
      id: "n3-quel-algorithme-de-tri-a-une-complexite-moyenne-en-o-n",
      tallyId: "8767a817-e7b9-45e1-b256-7460e641b770",
      label: "Quel algorithme de tri a une complexité moyenne en O(n log n) ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "a905f9f5-a144-4715-b677-9c271f123757", label: "Tri à bulles" },
        { tallyId: "e918cd56-c41e-4a14-9a77-7a658e570d20", label: "Tri par sélection" },
        { tallyId: "fe1627c0-d917-49f8-a44b-a637022e6772", label: "Tri fusion" },
        { tallyId: "07a94aa2-7468-4826-9d66-e74e7f66c4c9", label: "Tri par insertion" },
      ],
    },
    {
      id: "n3-en-programmation-orientee-objet-quel-concept-permet-a-",
      tallyId: "8e38e1c3-98b7-4f59-ac25-0a079e0d833c",
      label: "En programmation orientée objet, quel concept permet à une classe de reprendre les attributs d'une autre ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "e3a48a05-483b-4919-adda-438b9bded913", label: "Encapsulation" },
        { tallyId: "a79af23b-9277-4c33-987f-5d319f01c271", label: "Héritage" },
        { tallyId: "72c22327-a8db-4452-b2bd-134f9273318a", label: "Compilation" },
        { tallyId: "66559c7c-3542-4e04-a578-6f2e45ed3bc6", label: "Récursivité" },
      ],
    },
    {
      id: "n3-quelle-commande-git-enregistre-les-modifications-dans-",
      tallyId: "7cfe40d9-7645-430a-969b-b4e5b7ebcf24",
      label: "Quelle commande Git enregistre les modifications dans l'historique local ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "364dcbc2-6ae7-4a4d-b10f-de307bafbe1a", label: "git push" },
        { tallyId: "5e65fb97-8899-4a3d-912f-b56879ad0803", label: "git pull" },
        { tallyId: "e9029821-bcae-4e27-b740-1dc100506846", label: "git clone" },
        { tallyId: "f37ea8c4-47b8-4c5d-8ee0-d51d13e202c2", label: "git commit" },
      ],
    },
    {
      id: "n3-que-mesure-le-decibel-db",
      tallyId: "06a4e3e8-adc5-4305-aa5e-825ceb845f58",
      label: "Que mesure le décibel (dB) ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "22e2a684-a4ec-4738-a031-835ec5da72ce", label: "Une distance" },
        { tallyId: "3f290239-8276-400c-9ed4-7d8ea5153d69", label: "Un rapport de puissance" },
        { tallyId: "3440e2df-24f6-4039-9439-c7dc1e05670b", label: "Une tension continue" },
        { tallyId: "4c778e6d-4b03-4755-a8d6-876b0a1bd313", label: "Une température" },
      ],
    },
    {
      id: "n3-quelle-modulation-numerique-utilise-deux-etats-de-phas",
      tallyId: "303ef08b-3196-4af7-b240-ad47bf5673f6",
      label: "Quelle modulation numérique utilise deux états de phase ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "eea7380e-4902-4263-9817-b3c16893c4e2", label: "ASK" },
        { tallyId: "f87016dc-a7de-4472-9889-38bebe495076", label: "16-QAM" },
        { tallyId: "96add940-7355-425b-aeef-eff29c95be6c", label: "BPSK" },
        { tallyId: "e73244f7-3f3a-4824-a82b-702651f63f4b", label: "OFDM" },
      ],
    },
    {
      id: "n3-quelle-est-la-difference-entre-debit-et-bande-passante",
      tallyId: "35e052c7-e453-4740-a571-99b954598be3",
      label: "Quelle est la différence entre débit et bande passante ?",
      type: "textarea",
      required: true,
      track: "telecoms",
    },
  ],
  4: [
    {
      id: "n4-quelle-est-la-condition-de-shannon-nyquist-pour-echant",
      tallyId: "92fedeeb-284a-4265-bb1a-8cccac1d70ed",
      label: "Quelle est la condition de Shannon-Nyquist pour échantillonner un signal ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "775ec220-bb90-4931-8157-8e73b69b8d42", label: "fe ≤ fmax" },
        { tallyId: "33621590-e233-461a-83ec-18fd2ab9feb8", label: "fe = fmax" },
        { tallyId: "c7bb888c-14d3-4f23-b0cb-ab0b1d5e5aff", label: "fe ≥ fmax / 2" },
        { tallyId: "7a9e2065-1699-4635-ae4c-904c04f23a13", label: "fe ≥ 2 × fmax" },
      ],
    },
    {
      id: "n4-a-quoi-sert-un-vlan",
      tallyId: "8aba8a94-a7af-460b-bbe2-4952f5f393b5",
      label: "À quoi sert un VLAN ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "1c5d8e74-9c96-480f-af14-0e7baeb09472", label: "Segmenter logiquement un réseau" },
        { tallyId: "88dcafde-236d-41d7-a0d3-862e5e18149c", label: "Augmenter la puissance du Wi-Fi" },
        { tallyId: "ee36700c-b1e9-402e-b8b9-4760f1e48962", label: "Chiffrer les données" },
        { tallyId: "07baaa5d-b82d-4f92-856e-8b90e15a1a3f", label: "Remplacer le routeur" },
      ],
    },
    {
      id: "n4-le-chiffrement-a-cle-publique-est-il-symetrique-ou-asy",
      tallyId: "15695578-7f5f-45fe-bffe-c497d79259ac",
      label: "Le chiffrement à clé publique est-il symétrique ou asymétrique ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "97a1a520-1f39-4001-bddb-36f1e3ae6e7d", label: "Symétrique" },
        { tallyId: "1f21b16f-8192-4c89-8b8b-fc46beca1509", label: "Asymétrique" },
        { tallyId: "0af8e9ef-7370-4f04-98fa-1161aa4b7589", label: "Ni l'un ni l'autre" },
      ],
    },
    {
      id: "n4-quelle-est-la-difference-entre-un-processus-et-un-thre",
      tallyId: "9249990b-971e-41f0-b0da-cc827b01ef7c",
      label: "Quelle est la différence entre un processus et un thread ?",
      type: "textarea",
      required: true,
    },
    {
      id: "n4-propose-un-projet-pour-le-club-avec-les-etapes-et-les-",
      tallyId: "242b56d4-af12-471d-b595-dddfcf036236",
      label: "Propose un projet pour le club, avec les étapes et les ressources nécessaires.",
      type: "textarea",
      required: true,
    },
    {
      id: "n4-quelle-est-la-difference-entre-http-et-https",
      tallyId: "e556fbe5-22d7-444c-91ba-7f72fac1f152",
      label: "Quelle est la différence entre HTTP et HTTPS ?",
      type: "textarea",
      required: true,
    },
    {
      id: "n4-a-quoi-sert-le-nat-dans-un-reseau",
      tallyId: "1e8ffd1d-2b9c-4b2b-bece-6e827f202640",
      label: "À quoi sert le NAT dans un réseau ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "53b41674-60a9-47e9-903d-e299e9480273", label: "Traduire des adresses IP privées en adresses publiques" },
        { tallyId: "333578c9-3467-4b11-a5f6-ed65b1bbd6aa", label: "Compresser les données" },
        { tallyId: "8e6df037-0efd-496d-962f-5eb85d15a879", label: "Amplifier le signal Wi-Fi" },
        { tallyId: "31b64c80-52ff-4136-8340-8cfb737f6b8b", label: "Sauvegarder les fichiers" },
      ],
    },
    {
      id: "n4-quelle-est-la-fonction-principale-d-un-pare-feu",
      tallyId: "5aea2c93-f3bb-467a-93bd-4d698757a4c0",
      label: "Quelle est la fonction principale d'un pare-feu ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "8ce20f97-6335-43d6-8cc0-c960cb360cfa", label: "Amplifier le signal" },
        { tallyId: "6066fbe8-1e88-4ee2-880b-8e31ebcd4635", label: "Filtrer le trafic réseau selon des règles" },
        { tallyId: "1000ca29-e96f-4818-8c74-488726de3952", label: "Compresser les fichiers" },
        { tallyId: "597556a8-207f-4cfa-b6c5-537ef3f7c104", label: "Stocker les mots de passe" },
      ],
    },
    {
      id: "n4-lequel-de-ces-algorithmes-de-chiffrement-est-asymetriq",
      tallyId: "931c9aac-ef44-4f21-92ab-09ff8186b47a",
      label: "Lequel de ces algorithmes de chiffrement est asymétrique ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "338eec41-c4ac-4a02-802f-26adc40e8a4d", label: "AES" },
        { tallyId: "53c002db-e8b7-4e51-aef8-d328db977e33", label: "DES" },
        { tallyId: "ba47c3ac-f761-4108-b3d8-8453c068ac7a", label: "SHA-256" },
        { tallyId: "8d707102-1201-475d-9e7a-2cc1b8387557", label: "RSA" },
      ],
    },
    {
      id: "n4-que-produit-une-fonction-de-hachage",
      tallyId: "8d6d5883-fb54-4895-b694-da8c94900f0d",
      label: "Que produit une fonction de hachage ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "efccbf92-89c5-4289-af3d-5fc355831692", label: "Une version chiffrée réversible des données" },
        { tallyId: "c0880513-0dd9-41b5-a44b-4c604c1bd600", label: "Une empreinte de taille fixe à partir d'une donnée" },
        { tallyId: "2d38038c-4a75-4b3c-8241-1bdac40472a6", label: "Une copie compressée" },
        { tallyId: "7ef19cdc-35a5-4e36-a1ed-3a8bdddad88f", label: "Un signal d'erreur" },
      ],
    },
    {
      id: "n4-quel-protocole-permet-un-acces-distant-securise-a-un-s",
      tallyId: "f85d9b9e-5e55-4b39-910b-694de68f6927",
      label: "Quel protocole permet un accès distant sécurisé à un serveur ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "c46e4ae6-8275-4e86-859f-5bdd2726c452", label: "Telnet" },
        { tallyId: "7d9fe95e-0ad9-4c5e-aa4c-245bba235298", label: "FTP" },
        { tallyId: "b26002cc-307a-498d-9495-aae80875f87f", label: "SSH" },
        { tallyId: "7c037d29-c3b6-43be-8e34-4086030621ac", label: "HTTP" },
      ],
    },
    {
      id: "n4-dans-la-virtualisation-quel-logiciel-gere-les-machines",
      tallyId: "26cb8de9-5c34-489c-a692-d092526db72a",
      label: "Dans la virtualisation, quel logiciel gère les machines virtuelles ?",
      type: "choice",
      required: true,
      options: [
        { tallyId: "dea5f822-96a1-4788-aa54-b5209db32b35", label: "Compilateur" },
        { tallyId: "2ba3c8d6-4206-43e6-b178-0e73a9700bea", label: "Pilote" },
        { tallyId: "de388b48-eb9a-4960-81c8-e8663cffad97", label: "Noyau" },
        { tallyId: "d652123b-a790-487b-bffc-293706e82e2e", label: "Hyperviseur" },
      ],
    },
    {
      id: "n4-que-garantit-l-atomicite-d-une-transaction-proprietes-",
      tallyId: "f50adb01-cf9d-428a-bba5-209aa15f465f",
      label: "Que garantit l'atomicité d'une transaction (propriétés ACID) ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "b6d1d6c5-9822-4f5e-a442-83b4368a2e14", label: "Elle s'exécute entièrement ou pas du tout" },
        { tallyId: "eec2c139-a2fc-49c5-aeaf-4c59aee59823", label: "Elle est chiffrée" },
        { tallyId: "fd550a38-6351-4404-8aee-4882dba874d0", label: "Elle est plus rapide" },
        { tallyId: "d1cab43d-23de-4d5c-be35-ffbbbe06db41", label: "Elle est sauvegardée automatiquement" },
      ],
    },
    {
      id: "n4-quel-est-le-principe-d-une-api-rest",
      tallyId: "6bff2274-21ab-4484-9171-1e5b341ef5c9",
      label: "Quel est le principe d'une API REST ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "09f25715-8b80-4f69-a1da-b0998a3bc149", label: "Communiquer par fichiers locaux" },
        { tallyId: "2e4dc269-3532-4381-9b0f-bca82a138040", label: "Accéder à des ressources identifiées par des URL via HTTP" },
        { tallyId: "dc24075b-d5c7-4d47-9455-14ad4987cee7", label: "Remplacer la base de données" },
        { tallyId: "599cfa2e-40aa-48c9-9045-b7fb51218b41", label: "Compiler le code" },
      ],
    },
    {
      id: "n4-qu-est-ce-qu-une-injection-sql",
      tallyId: "d48338d8-d2e8-40f9-b69e-0b77ecbd5c64",
      label: "Qu'est-ce qu'une injection SQL ?",
      type: "choice",
      required: true,
      track: "informatique",
      options: [
        { tallyId: "568ad70b-6965-492b-8bac-ae63999be8e2", label: "Un type de jointure" },
        { tallyId: "11022baa-afc0-4f86-8779-5e8156b77c40", label: "Un index de base de données" },
        { tallyId: "eb5528bc-c038-4545-9791-d529a9efeb4d", label: "L'insertion de code SQL malveillant via une saisie utilisateur" },
        { tallyId: "dd6fcebe-4a01-4cf6-b831-eb553632de19", label: "Une sauvegarde de table" },
      ],
    },
    {
      id: "n4-quelle-est-la-formule-de-la-capacite-de-shannon",
      tallyId: "c0406980-eaf4-4d8e-a028-d473ec8f9c6e",
      label: "Quelle est la formule de la capacité de Shannon ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "c092b252-dfd2-4683-8e05-fec08930b927", label: "C = B × SNR" },
        { tallyId: "277be790-392d-4397-abb1-fc990e956c6d", label: "C = B / SNR" },
        { tallyId: "af16733f-4e8a-4bba-9fb1-7974e328bc68", label: "C = B · log₂(1 + SNR)" },
        { tallyId: "66fa5fc6-dcb0-4af7-8460-f1ec372db058", label: "C = log₂(B) + SNR" },
      ],
    },
    {
      id: "n4-a-quoi-sert-l-ofdm",
      tallyId: "1faa15f4-3d89-46ac-a461-116e72b9c980",
      label: "À quoi sert l'OFDM ?",
      type: "choice",
      required: true,
      track: "telecoms",
      options: [
        { tallyId: "08f68046-7453-46c1-b375-f3c08f558bfe", label: "Diviser le signal en sous-porteuses pour limiter les interférences" },
        { tallyId: "7b986061-d230-428d-8aa4-7033791d368a", label: "Amplifier le signal" },
        { tallyId: "99633655-647a-4bc9-8c2c-29ccd5d0130b", label: "Compresser les fichiers" },
      ],
    },
    {
      id: "n4-compare-la-4g-et-la-5g-sur-trois-points-techniques",
      tallyId: "b1cead1e-44b1-4fc7-99dd-effea0481999",
      label: "Compare la 4G et la 5G sur trois points techniques.",
      type: "textarea",
      required: true,
      track: "telecoms",
    },
  ],
};

const AUDITION_FINAL_QUESTIONS_RAW: AuditionQuestion[] = [
    {
      id: "f-quelle-idee-de-projet-aimerais-tu-realiser-au-sein-du-",
      tallyId: "c3aa36ba-0c8d-4706-b3e8-9a4d99728d4d",
      label: "Quelle idée de projet aimerais-tu réaliser au sein du club ?",
      type: "textarea",
      required: true,
    },
    {
      id: "f-lien-github-ou-portfolio-facultatif",
      tallyId: "ef2fc41f-7179-49ea-96a8-78b7220c0a1b",
      label: "Lien GitHub ou portfolio (facultatif)",
      type: "url",
      required: false,
    },
];

/**
 * Questions ouvertes du formulaire Tally converties en QCM natifs.
 *
 * Tally attend le libellé (et non un UUID d'option) pour ces blocs d'origine
 * textuelle : `submitAs: 'label'` conserve donc la compatibilité de l'envoi.
 */
interface AuditionQcmOverride {
  label?: string;
  options: AuditionOption[];
}

const AUDITION_QCM_OVERRIDES: Record<string, AuditionQcmOverride> = {
  'g-pourquoi-veux-tu-rejoindre-le-club': {
    options: [
      {
        tallyId: 'motivation-reseau',
        label: "Pour intégrer un réseau d'élèves-ingénieurs et partager des connaissances",
      },
      {
        tallyId: 'motivation-competences',
        label: 'Pour développer mes compétences techniques sur des projets concrets',
      },
      {
        tallyId: 'motivation-hackathons',
        label: "Pour participer à des hackathons et à des ateliers pratiques",
      },
      {
        tallyId: 'motivation-decouverte',
        label: "Pour découvrir le club avant de décider si je souhaite m'engager",
      },
    ],
  },
  'n1-quel-appareil-technologique-t-intrigue-et-comment-fonc': {
    options: [
      {
        tallyId: 'appareil-smartphone',
        label:
          'Le smartphone : il combine écran tactile, processeur, capteurs et connexion réseau',
      },
      {
        tallyId: 'appareil-box',
        label: 'La box Internet : elle convertit le signal du réseau en Wi-Fi pour la maison',
      },
      {
        tallyId: 'appareil-casque',
        label: "Le casque Bluetooth : il reçoit l'audio par ondes radio et le restitue",
      },
      {
        tallyId: 'appareil-montre',
        label:
          'La montre connectée : elle mesure l’activité et communique avec le téléphone',
      },
    ],
  },
  'n1-cite-un-exemple-de-support-de-transmission': {
    label: 'Lequel de ces éléments est un support de transmission ?',
    options: [
      { tallyId: 'support-tcp', label: 'Le protocole TCP' },
      { tallyId: 'support-fibre', label: 'La fibre optique' },
      { tallyId: 'support-navigateur', label: 'Le navigateur web' },
      { tallyId: 'support-routeur', label: 'Le routeur' },
    ],
  },
  'n2-ecris-l-algorithme-en-pseudo-code-ou-dans-le-langage-d': {
    label: "Quelle méthode permet de trouver le plus grand nombre d'une liste ?",
    options: [
      { tallyId: 'max-somme', label: 'Additionner tous les éléments de la liste' },
      {
        tallyId: 'max-parcours',
        label:
          'Initialiser le maximum au premier élément, puis comparer chaque élément et mettre à jour le maximum',
      },
      { tallyId: 'max-comptage', label: "Compter le nombre d'éléments de la liste" },
      {
        tallyId: 'max-milieu',
        label: "Prendre systématiquement l'élément du milieu de la liste",
      },
    ],
  },
  'n2-quelle-est-la-difference-entre-un-signal-analogique-et': {
    options: [
      {
        tallyId: 'signal-analogique-rapide',
        label: 'Le signal analogique est toujours plus rapide que le signal numérique',
      },
      {
        tallyId: 'signal-numerique-texte',
        label: 'Le signal numérique ne peut transporter que du texte',
      },
      {
        tallyId: 'signal-continu-discret',
        label:
          'Le signal analogique varie de façon continue, le signal numérique prend des valeurs discrètes',
      },
      {
        tallyId: 'signal-identique',
        label: 'Les deux signaux sont identiques, seule leur fréquence change',
      },
    ],
  },
  'n3-quelle-est-la-difference-entre-la-modulation-am-et-la-': {
    options: [
      {
        tallyId: 'am-fm-amplitude-frequence',
        label:
          "AM fait varier l'amplitude de la porteuse, FM fait varier sa fréquence",
      },
      {
        tallyId: 'am-fm-inverse',
        label: "AM fait varier la fréquence, FM fait varier l'amplitude",
      },
      {
        tallyId: 'am-fm-numerique',
        label: 'AM est réservée au numérique, FM à l’analogique',
      },
      {
        tallyId: 'am-fm-phase',
        label: 'AM et FM modifient uniquement la phase du signal',
      },
    ],
  },
  'n3-explique-ce-qui-se-passe-entre-la-saisie-d-une-url-dan': {
    options: [
      {
        tallyId: 'url-sans-reseau',
        label: "Le navigateur envoie l'URL à l'écran sans passer par le réseau",
      },
      {
        tallyId: 'url-dns-affiche',
        label: 'Le serveur DNS affiche lui-même la page demandée',
      },
      {
        tallyId: 'url-routeur-email',
        label: 'Le routeur télécharge la page puis l’envoie par email au navigateur',
      },
      {
        tallyId: 'url-dns-http-html',
        label:
          'Le navigateur résout le nom de domaine en adresse IP (DNS), ouvre une connexion au serveur, puis affiche la réponse HTML',
      },
    ],
  },
  'n3-quelle-est-la-difference-entre-debit-et-bande-passante': {
    options: [
      {
        tallyId: 'debit-bp-identiques',
        label: 'Le débit et la bande passante désignent exactement la même chose',
      },
      {
        tallyId: 'debit-bp-definition',
        label:
          'Le débit est la quantité de données transférées par seconde ; la bande passante est la plage de fréquences disponible',
      },
      {
        tallyId: 'debit-bp-unites',
        label:
          'Le débit se mesure en hertz ; la bande passante en bits par seconde',
      },
      {
        tallyId: 'debit-bp-inverse',
        label:
          'La bande passante est la vitesse réelle ; le débit est la largeur du canal',
      },
    ],
  },
  'n4-quelle-est-la-difference-entre-un-processus-et-un-thre': {
    options: [
      {
        tallyId: 'processus-memoire',
        label:
          "Un processus possède son propre espace mémoire ; les threads d'un même processus partagent cet espace",
      },
      {
        tallyId: 'thread-memoire',
        label:
          'Un thread possède toujours son propre espace mémoire, contrairement au processus',
      },
      {
        tallyId: 'processus-leger',
        label: "Un processus est plus léger et plus rapide à créer qu'un thread",
      },
      {
        tallyId: 'processus-thread-identiques',
        label: 'Les deux termes désignent exactement la même chose',
      },
    ],
  },
  'n4-propose-un-projet-pour-le-club-avec-les-etapes-et-les-': {
    label:
      'Quel projet aimerais-tu proposer au club, avec les étapes et les ressources nécessaires ?',
    options: [
      {
        tallyId: 'projet-portail',
        label:
          'Un portail de ressources pédagogiques : enquête, maquettes UI, développement web, hébergement et maintenance',
      },
      {
        tallyId: 'projet-wifi',
        label:
          'Un réseau Wi-Fi expérimental : étude de couverture, choix du matériel, configuration et tests',
      },
      {
        tallyId: 'projet-linux',
        label:
          'Un atelier d’initiation à Linux : programme, supports, salle et formateurs bénévoles',
      },
      {
        tallyId: 'projet-tournoi',
        label:
          'Un tournoi de jeux vidéo : inscription des équipes, calendrier, salle et arbitres',
      },
    ],
  },
  'n4-quelle-est-la-difference-entre-http-et-https': {
    options: [
      { tallyId: 'https-ancien', label: 'HTTPS est un protocole plus ancien que HTTP' },
      {
        tallyId: 'https-compression',
        label: 'HTTP chiffre les données ; HTTPS les compresse',
      },
      {
        tallyId: 'https-tls',
        label:
          'HTTPS ajoute un chiffrement TLS qui protège les données échangées ; HTTP circule en clair',
      },
      {
        tallyId: 'https-identique',
        label:
          'Les deux protocoles utilisent le même port et le même niveau de sécurité',
      },
    ],
  },
  'n4-compare-la-4g-et-la-5g-sur-trois-points-techniques': {
    label: 'Quelle comparaison entre la 4G et la 5G est correcte ?',
    options: [
      {
        tallyId: 'reseau-4g-superieure',
        label: 'La 4G offre un débit plus élevé et une latence plus faible que la 5G',
      },
      {
        tallyId: 'reseau-5g-superieure',
        label:
          "La 5G offre un débit plus élevé, une latence plus faible et supporte plus d'appareils connectés",
      },
      {
        tallyId: 'reseau-5g-voix',
        label: 'La 5G se limite à la voix ; la 4G gère les données',
      },
      {
        tallyId: 'reseau-identiques',
        label:
          'La 4G et la 5G utilisent exactement les mêmes fréquences et les mêmes débits',
      },
    ],
  },
  'f-quelle-idee-de-projet-aimerais-tu-realiser-au-sein-du-': {
    options: [
      {
        tallyId: 'idee-application',
        label:
          'Une application mobile utile au campus (emploi du temps, alertes, ressources)',
      },
      {
        tallyId: 'idee-site',
        label: 'Un site web ou un outil qui valorise les projets des étudiants',
      },
      {
        tallyId: 'idee-reseau',
        label:
          'Un projet réseau ou télécoms (Wi-Fi, serveur, objets connectés)',
      },
      {
        tallyId: 'idee-formation',
        label: "Un projet d'initiation ou de formation pour les nouveaux membres",
      },
    ],
  },
};

function withQcmOverrides(questions: AuditionQuestion[]): AuditionQuestion[] {
  return questions.map((question) => {
    const override = AUDITION_QCM_OVERRIDES[question.id];
    if (!override) return question;
    return {
      ...question,
      ...override,
      type: 'choice',
    };
  });
}

export const AUDITION_GENERAL_QUESTIONS: AuditionQuestion[] =
  withQcmOverrides(AUDITION_GENERAL_QUESTIONS_RAW);

export const AUDITION_LEVEL_QUESTIONS: Record<AuditionLevel, AuditionQuestion[]> = {
  1: withQcmOverrides(AUDITION_LEVEL_QUESTIONS_RAW[1]),
  2: withQcmOverrides(AUDITION_LEVEL_QUESTIONS_RAW[2]),
  3: withQcmOverrides(AUDITION_LEVEL_QUESTIONS_RAW[3]),
  4: withQcmOverrides(AUDITION_LEVEL_QUESTIONS_RAW[4]),
};

export const AUDITION_FINAL_QUESTIONS: AuditionQuestion[] =
  withQcmOverrides(AUDITION_FINAL_QUESTIONS_RAW);

export const AUDITION_LEVEL_LABELS: Record<AuditionLevel, string> = {
  1: 'Niveau 1',
  2: 'Niveau 2',
  3: 'Niveau 3',
  4: 'Niveau 4',
};

export const AUDITION_TRACK_LABELS: Record<AuditionTrack, string> = {
  informatique: 'Informatique',
  telecoms: 'Télécoms',
};

/** Questions générales qui pilotent l'aiguillage vers le bloc de niveau. */
export const AUDITION_LEVEL_QUESTION_ID = 'g-ton-niveau-academique';
export const AUDITION_TRACK_QUESTION_ID = 'g-ta-filiere';

function findAuditionOptionLabel(
  questionId: string,
  optionTallyId?: string
): string | null {
  if (!optionTallyId) return null;
  const question = AUDITION_GENERAL_QUESTIONS.find((item) => item.id === questionId);
  return question?.options?.find((option) => option.tallyId === optionTallyId)?.label ?? null;
}

export function getAuditionLevelFromAnswer(answer?: string): AuditionLevel | null {
  const label = findAuditionOptionLabel(AUDITION_LEVEL_QUESTION_ID, answer);
  const match = label?.match(/Niveau\s*([1-4])/i);
  return match ? (Number(match[1]) as AuditionLevel) : null;
}

export function getAuditionTrackFromAnswer(answer?: string): AuditionTrack | null {
  const label = findAuditionOptionLabel(AUDITION_TRACK_QUESTION_ID, answer);
  if (label === AUDITION_TRACK_LABELS.informatique) return 'informatique';
  if (label === AUDITION_TRACK_LABELS.telecoms) return 'telecoms';
  return null;
}

export function getAuditionLevelQuestions(
  level: AuditionLevel,
  track: AuditionTrack
): AuditionQuestion[] {
  return AUDITION_LEVEL_QUESTIONS[level].filter(
    (question) => !question.track || question.track === track
  );
}

export function getAuditionQuestions(
  level: AuditionLevel,
  track: AuditionTrack
): AuditionQuestion[] {
  return [
    ...AUDITION_GENERAL_QUESTIONS,
    ...getAuditionLevelQuestions(level, track),
    ...AUDITION_FINAL_QUESTIONS,
  ];
}
