#!/bin/bash

# Check if node_modules directory exists; if not, run npm install
if [ ! -d "node_modules" ]; then
  echo "Installing npm dependencies..."
  npm install
else
  echo "Dependencies already installed. Skipping npm install."
fi

# Create tsconfig.json only if it doesn't already exist
if [ ! -f "tsconfig.json" ]; then
  echo "Creating tsconfig.json..."

  cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "es2021",
    "lib": ["es2021", "dom"],
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "removeComments": true,
    "skipDefaultLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmitOnError": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
EOF

  echo "tsconfig.json has been set up."
else
  echo "tsconfig.json already exists. Skipping creation."
fi

echo "Compiling TypeScript files..."
tsc --project tsconfig.json

echo "Running the compiled JavaScript..."
echo "-------------------------------------------------------------------------"
node dist/main.js
