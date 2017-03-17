require 'open-uri'
require 'nokogiri'

class String
	def keyify
		self.downcase.split(" ").join("_")
	end
end	

@base = "https://www.naatp.org/"
@index_array = []
@rehab_links = []



def get_indices
  for i in 0..20
    @index_array << @base + "/resources/addiction-industry-directory?combine=&accredited_provider_60=All&state_province=All&membership_type_1=All&licensed_31=All&accreditation_35=All&number_of_beds_23=All&length_of_stay_26=All&country=All&payment_assistance_available_28=All&&&&&&&page=#{i}"
  end
  i = 0
  @index_array.each do |url|
    puts "Writing index #{i}"
    File.open("./indices/#{i}.html", "wb") do |file|
      open(url) do |uri|
        file.write(uri.read)
        i += 1
      end
    end
  end
end

def parse_indices
  indices = Dir["./indices/*.html"]
  indices.each do |file|
    parse_index(File.read(file))
    puts "#{@rehab_links.count} links in rehab_links"
  end
  str = @rehab_links.join(",")
  File.write("links.txt", str)
end


def parse_index(markup)
  html = Nokogiri::HTML(markup)
  html.css("a.accredited-").each do |tag|
    @rehab_links.push(@base + tag["href"])
  end
  html.css("a.accredited-Yes").each do |tag|
    @rehab_links.push(@base + tag["href"])
  end
end

def parse_show_pages
	rehab_htmls = Dir["./html/*.html"]
	rehab_htmls.each do |file|
		html = File.read(file)
		get_info(html)
	end
end

a = File.read(Dir["./html/*.html"][1])


def get_info(html)
	info_hash = {}
	colon_regex = Regexp.new(":")
	file = Nokogiri::HTML(html)
	views = file.css("div.views-field")
	views.each do |view|
		key = view.css("span.views-label").text.strip.sub("regex", "").keyify
		value = view.css("span.field-content").text.strip
		info_hash[key] = value
	end	
	return info_hash
end

puts get_info(a)

