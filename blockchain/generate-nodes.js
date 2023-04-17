const { spawnSync } = require("child_process");
const fs = require("fs");

// récupère le nombre de noeuds à créer en argument
const numberOfNodes = parseInt(process.argv[2]);

// définit les variables de configuration pour la génération de chaque noeud
const chainId = "12345";
const networkId = "23456";
const genesisPath = "./blockchain/besu/genesis.json";
const baseDir = "./blockchain/nodes";

// vérifie si le dossier nodes existe et le crée s'il n'existe pas
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// boucle pour générer chaque noeud
for (let i = 1; i <= numberOfNodes; i++) {
  // crée le dossier pour le noeud s'il n'existe pas
  const nodeDir = `${baseDir}/node${i}`;
  if (!fs.existsSync(nodeDir)) {
    fs.mkdirSync(nodeDir);
  }

  if (!fs.existsSync(`${nodeDir}/data`)) {
    fs.mkdirSync(`${nodeDir}/data`);
  }

  // copie le fichier genesis.json dans le dossier du noeud
  fs.copyFileSync(genesisPath, `${nodeDir}/genesis.json`);

  // génère les clés pour le noeud
  const keyFile = `${nodeDir}/key`;
  spawnSync("besu", ["--data-path", nodeDir, "public-key", "--to", keyFile]);

  // affiche les informations du noeud généré
  console.log(`Node ${i} generated:`);
  console.log(`- Key file: ${keyFile}`);
  console.log(`- Data directory: ${nodeDir}`);

  // crée le fichier de configuration pour le noeud
  const config = {
    network: {
      port: 30303 + i,
      nodeId: `node${i}`,
      bootnodes: [`enode://${"0".repeat(128)}@localhost:30301`],
      genesis: `${nodeDir}/genesis.json`,
      networkId,
      p2p: {
        enabled: true,
        listen: "127.0.0.1",
        bindIp: "127.0.0.1",
        port: 30303 + i,
        discovery: {
          enabled: true,
          bindIp: "127.0.0.1",
          port: 30303 + i,
          bootnodes: [`enode://${"0".repeat(128)}@localhost:30301`],
        },
      },
    },
    rpc: {
      http: {
        enabled: true,
        host: "127.0.0.1",
        port: 8545 + i,
      },
    },
    miner: {
      coinbase: `${"0".repeat(40)}`,
    },
    genesis: `${nodeDir}/genesis.json`,
    identity: keyFile,
  };

  // écrit le fichier de configuration dans le dossier du noeud
  const configPath = `${nodeDir}/config.json`;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // affiche le chemin du fichier de configuration
  console.log(`- Config file: ${configPath}`);
}
