#!/bin/bash

# TTF to WOFF2 Converter Script
# Usage: ./convert-fonts.sh [path/to/fonts/directory]
# If no path is provided, defaults to ./fonts/static/

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default path or use provided argument
FONT_PATH="${1:-./fonts/static/}"

echo -e "${BLUE}🔄 TTF to WOFF2 Converter${NC}"
echo -e "Converting fonts in: ${YELLOW}$FONT_PATH${NC}"
echo ""

# Check if directory exists
if [ ! -d "$FONT_PATH" ]; then
    echo -e "${RED}❌ Error: Directory '$FONT_PATH' does not exist!${NC}"
    echo "Usage: $0 [path/to/fonts/directory]"
    exit 1
fi

# Check if woff2_compress is installed
if ! command -v woff2_compress &> /dev/null; then
    echo -e "${RED}❌ Error: woff2_compress is not installed!${NC}"
    echo ""
    echo "Please install it first:"
    echo -e "${YELLOW}# On macOS with Homebrew:${NC}"
    echo "brew install woff2"
    echo ""
    echo -e "${YELLOW}# On Ubuntu/Debian:${NC}"
    echo "sudo apt-get install woff2"
    echo ""
    echo -e "${YELLOW}# On CentOS/RHEL/Fedora:${NC}"
    echo "sudo dnf install woff2-tools"
    echo "# or: sudo yum install woff2-tools"
    exit 1
fi

# Find all TTF files and convert them
ttf_files=$(find "$FONT_PATH" -name "*.ttf" -type f)

if [ -z "$ttf_files" ]; then
    echo -e "${YELLOW}⚠️  No TTF files found in '$FONT_PATH'${NC}"
    exit 0
fi

converted_count=0
total_original_size=0
total_compressed_size=0

echo -e "${BLUE}Found TTF files:${NC}"
echo "$ttf_files" | sed 's/^/  • /'
echo ""

# Convert each TTF file to WOFF2
while IFS= read -r ttf_file; do
    if [ -f "$ttf_file" ]; then
        # Get the base name without extension
        base_name=$(basename "$ttf_file" .ttf)
        dir_name=$(dirname "$ttf_file")
        woff2_file="$dir_name/$base_name.woff2"
        
        echo -e "Converting: ${YELLOW}$(basename "$ttf_file")${NC}"
        
        # Get original file size
        original_size=$(stat -c%s "$ttf_file" 2>/dev/null || stat -f%z "$ttf_file" 2>/dev/null)
        total_original_size=$((total_original_size + original_size))
        
        # Convert TTF to WOFF2
        if woff2_compress "$ttf_file"; then
            # Get compressed file size
            if [ -f "$woff2_file" ]; then
                compressed_size=$(stat -c%s "$woff2_file" 2>/dev/null || stat -f%z "$woff2_file" 2>/dev/null)
                total_compressed_size=$((total_compressed_size + compressed_size))
                
                # Calculate compression ratio
                savings=$(echo "scale=1; ($original_size - $compressed_size) * 100 / $original_size" | bc -l 2>/dev/null || echo "N/A")
                
                echo -e "  ✅ Created: ${GREEN}$base_name.woff2${NC} (${savings}% smaller)"
                converted_count=$((converted_count + 1))
            else
                echo -e "  ${RED}❌ Failed to create WOFF2 file${NC}"
            fi
        else
            echo -e "  ${RED}❌ Conversion failed for $ttf_file${NC}"
        fi
        echo ""
    fi
done <<< "$ttf_files"

# Summary
echo -e "${BLUE}📊 Conversion Summary:${NC}"
echo -e "  • Files converted: ${GREEN}$converted_count${NC}"

if [ $total_original_size -gt 0 ] && [ $total_compressed_size -gt 0 ]; then
    # Format file sizes
    original_kb=$((total_original_size / 1024))
    compressed_kb=$((total_compressed_size / 1024))
    total_savings=$(echo "scale=1; ($total_original_size - $total_compressed_size) * 100 / $total_original_size" | bc -l 2>/dev/null || echo "N/A")
    
    echo -e "  • Original size: ${YELLOW}${original_kb}KB${NC}"
    echo -e "  • Compressed size: ${GREEN}${compressed_kb}KB${NC}"
    echo -e "  • Total savings: ${GREEN}${total_savings}%${NC}"
fi

if [ $converted_count -gt 0 ]; then
    echo -e "\n${GREEN}🎉 All fonts converted successfully!${NC}"
    echo -e "You can now use the WOFF2 files in your Next.js project."
else
    echo -e "\n${RED}❌ No files were converted.${NC}"
    exit 1
fi